class Node:
    def __init__(s,data=None):
        s.data=data
        s.l=None
        s.r=None
    def find(s,x):
        nnode=s
        while nnode.data!=x:
            if x<nnode.data:
                nnode=nnode.l
            else:
                nnode=nnode.r
            if nnode==None:
                break
        if nnode==None:
            return False
        if nnode.data==x:
            return True
        
    def insert(s,x):
        nnode=s
        if s.find(x):
            print(x,"is already present")
            return
        while nnode!=None:
            p=nnode
            if x>nnode.data:
                nnode=nnode.r
            else:
                nnode=nnode.l
        if x<p.data:
            p.l=Node(x)
        else:
            p.r=Node(x)
