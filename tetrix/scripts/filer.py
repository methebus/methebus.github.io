from PIL import Image
from os import listdir
from os.path import isfile, join

files = [f for f in listdir('../images/photos/2016/') if isfile(join('../images/photos/2016/', f))]

for file in files:
	img = Image.open('../images/photos/2016/' + file)
	height = 150
	width = int(img.width / img.height * height)
	resized_img = img.resize((width, height), Image.ANTIALIAS)
	resized_img.save('../images/photos/2016/min/'+file)
	print('<a href="images/photos/2016/'+file+'.jpg" class="gallery-pic"><img src="images/photos/2016/min/'+file+'.jpg"></a>')