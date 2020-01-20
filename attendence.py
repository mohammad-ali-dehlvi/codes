import datetime
name=input("Enter file name: ")
name+='.txt'
f=open(name,'r')
d=f.read()
d=d.split()
d=[int(x) for x in d]
d.sort()
x=datetime.datetime.now()
print(d,x.date())
dit={}
dit[x.date]=d
f.close()

f.open(name,'a')
f.write(dit)
f.close()
