from app.models import *

authors = Author.objects.all()
print len(authors)

for i in range(len(authors)):
	classes = author.distribution.split('|')
	values = []
	for c in classes:
		values.append(int(c.split(':')[1]))
	print values