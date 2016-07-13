#!/usr/bin/env python3

import sys
import os
import inspect
import glob
import shutil
import base64

######################################
try:
    import csscompressor
except:
    print("Requires 'python3-csscompressor' package.")
    exit(1)

if not os.path.exists("/usr/bin/convert"):
    print("Requires 'convert' command from imagemagick package.")
    exit(1)

######################################
def load(path):
    f = open(path, "r")
    data = ""
    for line in f:
        data += line
    f.close()
    return data

def save(path, data):
    f = open(path, "w+")
    f.write(data)
    f.close()

######################################

def compress(filename):
    print("Compressing: " + filename)
    path = os.path.join(build_dir, filename)
    data = load(path)
    newdata = csscompressor.compress(data)
    save(path, newdata)

def strip(filename):
    print("Stripping: " + filename)
    path = os.path.join(build_dir, filename)
    data = load(path)
    newdata = ""
    for line in data.split('\n'):
        newdata += line.strip() + '\n'
    save(path, newdata)

def replace(filename, old, new):
    print("Replacing: " + filename)
    path = os.path.join(build_dir, filename)
    data = load(path)
    newdata = data.replace(old, new)
    save(path, newdata)

def convert_base64(filename):
    path = os.path.join(build_dir, filename)
    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    return(str(encoded_string))

def convert_img(filename):
    newname = filename.split('.')[0] + '.jpg'
    os.system("convert -flatten {0} {1}".format(filename, newname))

######################################
cur_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
build_dir = os.path.join(cur_dir, "build")

# Create target directory
if os.path.exists(build_dir):
    shutil.rmtree(build_dir)
os.mkdir(build_dir)
os.chdir(build_dir)

# Copy files to target
for ext in ["ico", "png", "html", "css", "js"]:
    path = glob.glob(cur_dir + '/*.' + ext)
    for file in path:
        print("Copying: " + file)
        shutil.copy(file, build_dir)

# Perform optimisation
# --> Compress Pages
compress("index.html")
compress("start.js")
strip("start.css")
replace("index.html", \
        '<link rel="stylesheet" type="text/css\" media="screen" href="start.css">', \
        "<style>" + load("start.css") + "</style>")
replace("index.html", \
        '<script src="start.js"></script>', \
        "<script>" + load("start.js") + "</script>")
replace("index.html", "><", ">\n<")

# --> Compress & Embed Images
replace("index.html", 'favicon.ico', 'data:image/ico;base64,' + convert_base64("favicon.ico"))

convert_img("logo.png")
replace("index.html", 'logo.png', 'data:image/jpg;base64,' + convert_base64("logo.jpg"))

convert_img("spritesheet.png")
replace("index.html", 'spritesheet.png', 'data:image/jpg;base64,' + convert_base64("spritesheet.jpg"))

# --> Clean up unused files
for ext in ["css", "ico", "png", "jpg", "js"]:
    path = glob.glob(build_dir + '/*.' + ext)
    for file in path:
        os.remove(file)
print("Finished!")
