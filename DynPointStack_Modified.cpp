#include "DynPointStack_Modified.h"
#include <iostream>
#include <fstream>
#include <string>

using namespace std;

Point::Point()
{
	x=0;
	y=0;
	value=0;
} 
Point::Point(int m,int n,int v)
{
	x=m;
	y=n;
	value=v;
}

StackNode::StackNode()
{
	next=NULL;
}

StackNode::StackNode(Point val){
	value=val;
	next=NULL;
}


StackNode::StackNode(int m, int n,int v)
{
	Point val(m,n,v);
	value=val;
	next=NULL;
}	

StackNode::StackNode(int m, int n,int v, StackNode* Nodeptr){
	Point val(m,n,v);
	value=val;
	next=Nodeptr;
}

StackNode &StackNode::operator=(StackNode Std){
	StackNode* newStd_temp=new StackNode(Std.value.x,Std.value.y,Std.value.value);
	StackNode temp(Std.value.x,Std.value.y,Std.value.value);/////////////////////////////////////////////////////////////
	StackNode* newStd_temp2;
	newStd_temp->next=newStd_temp2;
	newStd_temp=newStd_temp->next;
	while(Std.next!=NULL){
		Std=*Std.next;
		StackNode* newStdptr=new StackNode(Std.value.x,Std.value.y,Std.value.value); 
		newStd_temp->next=newStdptr;
		newStd_temp=newStd_temp->next;
	}
	*this=temp;
	return *this;
}


StackNode::~StackNode()
{
	//StackNode* NewNode;
	//if( next!=NULL)next=NewNode;
	if(this!=NULL){
	value.~Point();
	if( next!=NULL)next=NULL;
	}
	}



DynIntStack::DynIntStack(void){
	top = NULL;
}

DynIntStack::DynIntStack(Point& point,StackNode *Node){
	top=Node;
	top->value=point;
}
DynIntStack::DynIntStack(StackNode *Node){
	if(Node!=NULL) top=Node;
}

DynIntStack::DynIntStack(const DynIntStack & St){
	if(St.top==NULL){
		DynIntStack New;
		*this=New;
	}
	else{
		StackNode* newTop= new StackNode(St.top->value.x,St.top->value.y,St.top->value.value);
		StackNode* copyPtr= newTop;
		StackNode* copyPrev=copyPtr;
		StackNode* ptr=St.top;

		ptr=ptr->next;
		while (ptr!=NULL)
		{
			copyPtr=new StackNode(ptr->value.x,ptr->value.y,ptr->value.value);
			copyPrev->next=copyPtr;


			ptr=ptr->next;
			copyPtr=copyPtr->next;
			copyPrev=copyPrev->next;
		}
		top=newTop;;
	}
	
}

DynIntStack::~DynIntStack(){
	StackNode* NewNode=top;
	while (top!=NULL)
	{
		
		if(top->next!=NULL) NewNode=(top->next);
		else { top=NULL;NewNode=NULL;}
		top->~StackNode();
		top=NewNode;
		
	}

}


DynIntStack & DynIntStack::operator >> (Point & point){


	if (top==NULL){
		cout << "The stack is empty.\n";
	}
	else{
		StackNode *temp=new StackNode(*top);
		point=temp->value;
		if(top!=NULL) {temp = top->next;}
		else if(top->next==NULL)temp=NULL;
		//delete top;
		//if((temp!=NULL)&&!(top->value.x==0 && top->value.value==0 && top->value.y==0)){
			top = temp;

	}
	return *this;
}
DynIntStack & DynIntStack::operator <<(Point point){
	StackNode *newNode=new StackNode(point);
	// Allocate a new node & store Num

	// If there are no nodes in the list make newNode the firstnode
	if (top==NULL){
		top = newNode;
		newNode->next=NULL;
	}
	else{
		// Otherwise, insert NewNode before top
		newNode->next = top;
		top = newNode;
	}
	return *this;
}

DynIntStack &DynIntStack::operator+=( DynIntStack & dst){
	Point p;
	DynIntStack temp;
	while(!dst.isEmpty()){
		dst>>p;
		temp<<p;
	}
	while(!temp.isEmpty()){
		temp>>p;
		(*this)<<p;
	}
	return *this;
}

DynIntStack& DynIntStack::operator=( DynIntStack St){
	if(St.isEmpty()){
		DynIntStack New;
		*this=New;
	}
	else{
		StackNode* newTop= new StackNode(St.top->value.x,St.top->value.y,St.top->value.value);
		StackNode* copyPtr= newTop;
		StackNode* copyPrev=copyPtr;
		StackNode* ptr=St.top;

		ptr=ptr->next;
		while (ptr!=NULL)
		{
			copyPtr=new StackNode(ptr->value.x,ptr->value.y,ptr->value.value);
			copyPrev->next=copyPtr;


			ptr=ptr->next;
			copyPtr=copyPtr->next;
			copyPrev=copyPrev->next;
		}
		top=newTop;;
	}
	return *this;
}



bool DynIntStack::isEmpty(void) const{
	bool status;
	//||  (top->value.x==NULL && top->value.y==NULL)
	if (this==NULL || top==NULL)status =true;
	else status = false;
	return status;

}