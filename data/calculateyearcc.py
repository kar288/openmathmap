import json

f = open('../data/yearcc.txt', 'r')

minimum = 2014
maximum = 0
yearsum = {}
for i in range(100):
	num = str(i).zfill(2)
	yearsum[num] = {}
	# yearsum[num]['year'] = 2014
	yearsum[num]['count'] = 0
	yearsum[num]['last'] = 0

i = 0
while i < 6029064:

	year =  int(float(f.readline().split()[1]))
	classes =  f.readline().split('\t')[1].split()
	cs = []
	# print classes

	for c in classes:
		tmp = c[:2]
		# yearsum[tmp]['year'] += year
		yearsum[tmp]['count'] += 1
		# print year
		if int(year) > 2009:
			# print year
			yearsum[tmp]['last'] += 1
			# print yearsum[num]['last']
			# yearsum[tmp]['year'] = year
		
	i += 2;

# print yearsum

# for c in yearsum:
# 	if (yearsum[c]['year'] < 1951):

# 		print yearsum[c]['year'], c
# 		minimum = min(yearsum[c]['year'], minimum)
# 		maximum = max(yearsum[c]['year'], maximum)


# print minimum, maximum

f.close()

f = open('../data/jsonlastyearcc.txt', 'w')
f.write(json.dumps(yearsum))
f.close()