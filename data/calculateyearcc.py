import json

f = open('../data/yearcc.txt', 'r')

yearsum = {}
for i in range(100):
	num = str(i).zfill(2)
	yearsum[num] = {}
	yearsum[num]['year'] = 0
	yearsum[num]['count'] = 0

i = 0
while i < 6029064:

	year =  int(float(f.readline().split()[1]))
	classes =  f.readline().split('\t')[1].split()
	cs = []
	# print classes

	for c in classes:
		tmp = c[:2]
		yearsum[tmp]['year'] += year
		yearsum[tmp]['count'] += 1
		
	i += 2;

f.close()

f = open('../data/jsonyearcc.txt', 'w')
f.write(json.dumps(yearsum))
f.close()