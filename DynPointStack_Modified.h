#ifndef DYNINTSTACK_H
#define DYNINTSTACK_H

#include <iostream>
#include <fstream>
#include <string>

struct Point{
	int x;
	int y;
	int value;
	Point();
	Point(int m,int n,int v);

};


struct StackNode{
	Point value;
	StackNode *next;
	StackNode();
	StackNode(int m, int n,int v);
	StackNode(Point point);
	StackNode(int m, int n,int v, StackNode* Nodeptr);
	StackNode & operator=(StackNode Std);
	
	~StackNode();
};



class DynIntStack{
public:
	StackNode* top;
	DynIntStack(void);
	DynIntStack(StackNode *top);
	DynIntStack(Point &point,StackNode *top);
	DynIntStack(const DynIntStack & St);
	void push(Point );
	~DynIntStack();
	DynIntStack & operator>>(Point & p);
	DynIntStack & operator<<(Point  p);
	DynIntStack & operator+=(DynIntStack &St);
	DynIntStack & operator=( DynIntStack St) ;
	bool isEmpty(void) const;

};

#endif