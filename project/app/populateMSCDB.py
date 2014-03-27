from app.models import *

f = open('../MapData/Desc_msc2010-final.txt', 'r')
lastFirstMSC = ''
lastSecondMSC = ''
for line in f:
    parts = (line.strip()).split('***')
    print parts
    if parts[0].find('-') == -1 and parts[0].find('xx') ==-1:
        third = MSC.objects.create(main = 3, name = parts[1], number = parts[0])
        third.save()
        lastSecondMSC.child.add(third)
        print 'third'
    elif parts[0].find('XX') != -1:
        # if lastFirstMSC:
        #     lastFirstMSC.save()
        lastFirstMSC = MSC.objects.create(main = 1, name = parts[1], number = parts[0])
        lastFirstMSC.save()
    else:
        # if lastSecondMSC:
        #     
        lastSecondMSC = MSC.objects.create(main = 2, name = parts[1], number = parts[0])
        lastSecondMSC.save()
        lastFirstMSC.child.add(lastSecondMSC)
        print 'second'

