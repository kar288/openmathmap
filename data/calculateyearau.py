import json
from itertools import islice
from app.models import *

f = open('../data/yearaicc.txt', 'r')

authors = {}

while True:
	lines = list(islice(f, 3))
	if not lines:
		break
	year = int(lines[0].split()[1])
	a = lines[1].strip().split("\t")
	cs = lines[2].split()[1:]
	classes = set()
	for c in cs:
		classes.add(c[:2])
	if len(a) > 1:
		parts = a[1].strip().split("; ")
		for part in parts:
			p = part.split("|")[0]
			if p in authors:
				authors[p]['count'] += 1
				authors[p]['yearsum'] += year
				for c in classes:
					if c in authors[p]['classes']:
						authors[p]['classes'][c][0] += year
						authors[p]['classes'][c][1] += 1
					else:
						authors[p]['classes'][c] = []
						authors[p]['classes'][c].append(year)
						authors[p]['classes'][c].append(1)
			else:
				authors[p] = {}
				authors[p]['count'] = 1
				authors[p]['yearsum'] = year
				authors[p]['classes'] = {}
				for c in classes:
					authors[p]['classes'][c] = []
					authors[p]['classes'][c].append(year)
					authors[p]['classes'][c].append(1);

# print authors['erdos.paul']

print len(authors)
f.close()

for author in authors:
# 	# print author
	if len(author) > 0:
# 		# print author
		description = ""
		for c in authors[author]['classes']:
			description += chr(int(c)+1) + str(authors[author]['classes'][c][0]) + ":" + str(authors[author]['classes'][c][1]) + "."
		# authors[author]['description'] = description
# 		# print description
		if (author == 'cornelis.chris'):
			print  description
			print authors[author]['classes']
		a = Author.objects.create(name = author, yearsum = authors[author]['yearsum'], count = authors[author]['count'], distribution = description)

		if (author == 'cornelis.chris'):
			print a.distribution
		a.save()

# f = open('../data/try1.txt', 'w')
# for author in authors:
# 	authors[author]['description'] = ""
# 	for c in authors[author]['classes']:
# 		authors[author]['description'] += chr(int(c)) + str(authors[author]['classes'][c][0]) + ":" + str(authors[author]['classes'][c][1]) + "."
# 	authors[author].pop('classes')

# print authors['kohlhase.michael']
# f.write(json.dumps(authors))
# f.close()
