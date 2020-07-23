#include <fstream>
#include <string>
#include "DynPointStack_Modified.h"

static int MAINCOUNTER=0;

using namespace std;
//mehmetgultekin@sabanciuniv.edu


ostream & operator <<(ostream & os, DynIntStack &Stack){ //this function prints Stack while empting it.

	while(!Stack.isEmpty())
	{ //print stack's Points until it is emptied.
		Point num;
		Stack>>num;
		os.fill('0');
		os<<(num.y)<<","<<(num.x)<<endl;		
	}
	return os;
}

DynIntStack Compare (DynIntStack &Stack,DynIntStack &Stack2,int rowNumber,int ColumnNumber){
	//this function Compare's two stack's length and returns the short one.
	Point num,num2;
	static DynIntStack Stack_temp;				//used static the prevent probable errors of deleted stacks.
	if(Stack.top==nullptr)Stack_temp.top=nullptr;		//equals the main and static stacks.
	else Stack_temp=Stack;

	static DynIntStack Stack_temp2;
	if(Stack2.top==nullptr)Stack_temp2.top=nullptr; 
	else Stack_temp2=Stack2;

	if (Stack.top==nullptr)return Stack2;			//one of the stacks is already empty -> return other one  
	if (Stack2.top==nullptr)return Stack;

	Stack_temp>>num;
	Stack_temp2>>num2;
	while(Stack_temp.top!=nullptr && Stack_temp2.top!=nullptr )
	{//means until empty.
		if (num.x==0 || num.x==ColumnNumber-1 || num.y==0 || num.y==rowNumber-1)    return Stack; //if it s not an end, return other one.
		if (num2.x==0 || num2.x==ColumnNumber-1 || num2.y==0 || num2.y==rowNumber-1) return Stack2;
		Stack_temp>>num;
		Stack_temp2>>num;
	}
	if( Stack_temp.top==nullptr) return Stack2;
	else if(Stack_temp2.top==nullptr) return Stack;
}

DynIntStack & MazeRunner(Point** Array,int row,int column,int rowNumber,int columnNumber){ //these function is main maze solver, every parting of the ways seems like new maze and recursion happens.
	DynIntStack Stack;  //generates new stack to watch the new maze , every road is a new one.
	int count=1;  

	while(count!=0){
		count=0;
		//generates just one time and if returns something it means road is ended.
		bool up=false,down=false,right=false,left=false; 
		if (row!= 0)  if(Array[row-1][column].value==0)up=true;
		if (row!= rowNumber-1)if(Array[row+1][column].value==0) down=true;
		if (column!= 0) if(Array[row][column-1].value==0)left=true;
		if (column!= columnNumber-1) if(Array[row][column+1].value==0) right=true;

		if(up)count++;
		if(down)count++;
		if(left)count++;
		if(right)count++;
		//counted the forks.
		if (count==1){ //if there is one way to go, just go. and get in the "while" again.
			if (up){
				Array[row][column].value=1;   //closes the gate to old road
				Stack<<Array[row][column];  //gets the step in a new stack
				row=row-1;					//goes up
			}

			if (right){
				Array[row][column].value=1; //closes the gate to old road
				Stack<<Array[row][column];   //gets the step in a new stack
				column=column+1;				//goes rigth

			}
			if (down){
				Array[row][column].value=1;  //closes the gate to old road
				Stack<<Array[row][column];  //gets the step in a new stack
				row=row+1;					//goes down
			}
			if (left){
				Array[row][column].value=1;   //closes the gate to old road
				Stack<<Array[row][column];		//gets the step in a new stack
				column=column-1;			//goes left
			}
		}

		else if(count==2||count==3||count==4)		//if there is a fork(more than one way to go)
		{
			DynIntStack Stackup,Stackdown,Stackrigth,Stackleft,StR_temp,StD_temp,StU_temp,StL_temp;

			Stack<<Array[row][column];//step is taken in a stack just once.
			//try every road and decide which one is shortest?
			if(up)
			{
				Array[row][column].value=1; //close the gate already
				int row_temp=row-1; //can't change row or column use a new one to describe the new maze's beginning point
				DynIntStack StU_temp=MazeRunner(Array, row_temp, column, rowNumber, columnNumber); //act like you are in a new way.
				Stackup=StU_temp; //unnecessary but decrease the risks.
				StU_temp.~DynIntStack();
			}
			if(down)//same as up, and others
			{
				Array[row][column].value=1;
				int row_temp=row+1;
				DynIntStack StD_temp=MazeRunner(Array, row_temp, column, rowNumber, columnNumber);
				Stackdown=StD_temp;
				StD_temp.~DynIntStack();
			}
			if(left)
			{
				Array[row][column].value=1;
				int column_temp=column-1;
				DynIntStack StL_temp=MazeRunner(Array, row, column_temp, rowNumber, columnNumber);
				Stackleft= StL_temp;
				StL_temp.~DynIntStack();
			}
			if(right)
			{
				Array[row][column].value=1;
				int column_temp=column+1;
				DynIntStack StR_temp=MazeRunner(Array, row, column_temp, rowNumber, columnNumber);
				Stackrigth= StR_temp;
				StR_temp.~DynIntStack();

			}
			//which one is shortest?
			DynIntStack Stack1,Stack2;

			if (Stackdown.top!=nullptr || Stackup.top!=nullptr) Stack1=Compare(Stackdown,Stackup,rowNumber,columnNumber); //dont get in to "compare" if both of them are empty.
			else Stack1.top=nullptr;															//-- andjust say result = empty.
			/**************************************/
			if (Stackrigth.top!=nullptr ||Stackleft.top!=nullptr) Stack2=	Compare(Stackleft,Stackrigth,rowNumber,columnNumber);
			else Stack2.top=nullptr;
			/*************************************/
			DynIntStack Stack3= Compare(Stack1,Stack2,rowNumber,columnNumber);//stack3=shortest of the roads
			Stack1.~DynIntStack();
			Stack2.~DynIntStack();
			Stackup.~DynIntStack();
			Stackdown.~DynIntStack();
			Stackrigth.~DynIntStack();
			Stackleft.~DynIntStack();
			StR_temp.~DynIntStack();
			StD_temp.~DynIntStack();
			StU_temp.~DynIntStack();
			StL_temp.~DynIntStack();
			Point num;
			Stack+=Stack3; //shortest way included to stack.
			static DynIntStack* Stack_temp;		//used statics for preventing probable unintended deletions.
			Stack_temp=new DynIntStack(Stack);
			return *Stack_temp;
		}
	}
	static DynIntStack* Stack_temp;
	Stack_temp=new DynIntStack(Stack);
	return *Stack_temp;
}


void delete2Darray(Point** &Matrix,int row,int column){
	//this function deletes  two dimensional array which we created in main.
	int a=0;
	int b;
	while(a!=row)
	{
		b=0;
		while(b!=column)
		{
			Matrix[a][b].~Point();		//destructs every point
			b++;
		}
		delete[] Matrix[a];				//destructs point' pointers
		Matrix[a]=nullptr;
		a++;
	}
	delete[] Matrix;			//deletes remaining (main pointer (which points to the point pointers))
	Matrix=nullptr;
}

int main(){

	DynIntStack Stack;
	string filename;
	int column,row;
	int Xenter,Yenter;
	filename="maze" ;
	ifstream file;	
	fstream result;
	result.open("results");
	try{
		file.open(filename.c_str());	//opened file
		if(file.is_open()==false){   //exits if file is not found
			throw "error";
		}
	}
	catch(string str){
		return 0;
	} 
	//generates two d. array and takes points
	file.seekg(0);
	file>>column;
	file>>row;
	file>>Xenter;
	file>>Yenter;
	Stack<<Point(Xenter,Yenter,0); //includes first step of the maze, to main stack,
	int a;
	Point** twoDarray=new Point*[row];
	for(int r=0;r<row;r++){
		twoDarray[r]= new Point[column];
		for(int c=0;c<column;c++){
			file>>a;				//takes all integers and generates the stack 
			Point point(c,r,a);
			twoDarray[r][c]=point;	
		}
	}
	file.close();
	twoDarray[Yenter][Xenter].value=1;		//closes the door as beginning of the maze for player
	if(Xenter==0)Xenter=1; if(Xenter==column-1)Xenter-=1;;if( Yenter==0)Yenter+=1; if(Yenter==row-1)Yenter-=1; //first walk

	Stack+=MazeRunner(twoDarray,Yenter,Xenter,row,column); //maze running starts

	DynIntStack Result;
	Point point;
	int count=0;
	while(Stack.top!=nullptr )			//result is the upside down version, i need it since my stack begins with end of the maze
	{
		count++;				//counts how much steps in maze
		Stack>>point;
		Result<<point;
	}
	result<<count<<endl;
	for(int i=0;i<=count;i++){
		//prints the result stack which is shortest solution
		result<<Result;
	}
	delete2Darray(twoDarray,row,column);
	Stack.~DynIntStack();//deletes created two d. array.
	Result.~DynIntStack();//deletes created two d. array.
	return 0;
}
