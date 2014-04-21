from app.models import *
from itertools import islice

f = open('../data/small.txt', 'r')
lastFirstMSC = ''
lastSecondMSC = ''
while True:
    o = {}
    lines = list(islice(f, 6))
    print lines
    if not lines:
        break
    p = Publication.objects.create(pid = lines[0].split('\t')[1].strip());
    p.py = lines[1].split('\t')[1].strip();
    authors = lines[2].split('\t')
    if len(authors) > 1:
        p.author = authors[1].strip();
    else:
        # p.delete()
        continue;
    title = lines[3].split('\t')
    if len(title) > 1:
        p.title = title[1].strip();
    else:
        # p.delete()
        continue;
    classes = lines[4].split('\t');
    # print classes
    if len(classes) > 1:
    #     print classes[1]
        for c in classes[1].split():
            cs = MSC.objects.filter(number = c.strip())
            if cs:
                p.classes.add(cs[0])
            else:
                # p.delete()
                continue;
    else:
        # p.delete()
        continue;
    p.save()

# from app.models import *
# from itertools import islice

# f = open('../data/small', 'r')

# while True:
    # print 'a'
    # print f.read()
    # o = {}
    # lines = list(islice(f, 6))
    # print lines
    # if not lines:
    #     break
    # p = Publications.objects.create(pid = lines[0].split('\t')[1].strip());
    # p.py = lines[1].split('\t')[1].strip();
    # for author in lines[2].split('\t')[1].split(';'):
    #     p.author.add(author.strip())
    # p.title = lines[3].split('\t')[1].strip();
    # for c in lines[4].split('\t')[1].split():
    #     p.classes.add(MSC.objects.filter(number = c.strip())[0])
    # p.save()