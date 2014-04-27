from app.models import *


rusinColoring = [
              # 0   1   2   3   4   5   6   7   8   9
               17, 17,  0,  1,  0,  2,  2,  0,  1,  0,  # 00
                0,  3,  4,  4,  4,  4,  4,  4,  1,  4,  # 10
                4,  0,  4,  0,  0,  0,  8,  0,  8,  0,  # 20
                9,  9,  9,  8, 11, 11,  0, 11,  0,  8,  # 30
                8, 10,  7,  7,  7, 11,  7,  7,  0, 11,  # 40
                0,  5,  5,  5,  6,  6,  0,  6, 11,  0,  # 50
               15,  0, 16,  0,  0, 10,  0,  0, 14,  0,  # 60
               12,  0,  0,  0, 12,  0, 12,  0, 12,  0,  # 70
               12, 12, 12, 12,  0, 12, 12,  0,  0,  0,  # 80
               10, 12, 13, 13, 14,  0,  0, 17,  0,  0   # 90
        ];

rusinNames = [
        "Foundations",
        "Combinatorics",
        "Number Theory",
        "Abstract Algebra",
        "Geometry",
        "Topology",
        "Functional Analysis",
        "Real Analysis",
        "Complex Analysis",
        "Numerical Analysis",
        "Differential Equations",
        "Physics and other",
        "Sciences & Engineering",
        "Computers, Information",
        "Probability",
        "Statistics",
        "History and General"
]


rusinColors = [
    "#cc00cc",
    "#cc0099",
    "#e6177e",
    "#cd0000",
    "#cdcd00",
    "#cfe600",
    "#88cc00",
    "#44cc00",
    "#00cc44",
    "#00cc88",
    "#0088cc",
    "#0044cc",
    "#8800cc",
    "#cc00cc",
    "#cd8900",
    "#e6b800",
    "#a3cccc",
]

for i in range(17):
    rusin = RusinClass.objects.create(rusin_id = i + 1, name = rusinNames[i], color = rusinColors[i])
    rusin.save()

f = open('../MapData/Desc_msc2010-final.txt', 'r')
lastFirstMSC = ''
lastSecondMSC = ''
for line in f:
    parts = (line.strip()).split('***')
    # print parts
    if parts[0].find('-') == -1 and parts[0].find('xx') ==-1:
        third = MSC.objects.create(main = 3, name = parts[1], number = parts[0])
        third.save()
        lastSecondMSC.child.add(third)
        # print 'third'
    elif parts[0].find('XX') != -1:
        rusin = RusinClass.objects.get(rusin_id = rusinColoring[int(parts[0][:2])])
        # print rusin.rusin_id
        lastFirstMSC = MSC.objects.create(main = 1, name = parts[1], number = parts[0], rusin = rusin)
        lastFirstMSC.save()
    else:
        lastSecondMSC = MSC.objects.create(main = 2, name = parts[1], number = parts[0])
        lastSecondMSC.save()
        lastFirstMSC.child.add(lastSecondMSC)
        # print 'second'

