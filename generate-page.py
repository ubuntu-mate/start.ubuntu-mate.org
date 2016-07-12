#!/usr/bin/env python3

import sys
import os
import inspect
import glob
import shutil

######################################
try:
    import csscompressor
except:
    print("Requires 'python3-csscompressor' package.")

try:
    import tidylib
except:
    print("Requires 'python3-tidylib' package.")

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

def minify(filename):
    print("Minifying: " + filename)
    path = os.path.join(build_dir, filename)
    data = load(path)
    newdata = tidylib.tidy_document(data)[0]
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

######################################
cur_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
build_dir = os.path.join(cur_dir, "build")

# Create target directory
if os.path.exists(build_dir):
    shutil.rmtree(build_dir)
os.mkdir(build_dir)
os.chdir(build_dir)

# Copy files to target
for ext in ["ico", "png", "html", "css"]:
    path = glob.glob(cur_dir + '/*.' + ext)
    for file in path:
        print("Copying: " + file)
        shutil.copy(file, build_dir)

# Perform optimisation
compress("index.html")
strip("start.css")
replace("index.html", \
        '<link rel="stylesheet" type="text/css\" media="screen" href="start.css">', \
        "<style>" + load("start.css") + "</style>")
replace("index.html", "><", ">\n<")

# Clean up unused files
for file in ["start.css"]:
    os.remove(os.path.join(build_dir, file))

# Done!
print("Finished!")
