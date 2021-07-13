#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>
using namespace std;
/*
in
out




*/

int gc;
int gci;
char **gar;
string exitFile = "";

void getHtml(string filePath, string tree){

    string line;
    ifstream myfile("input/" + filePath + ".html");

    if (myfile.is_open())
    {
        while ( getline (myfile,line) )
        {
            if (line.find("<atd-") != std::string::npos) {
                string name = "";
                for (size_t i = line.find("<atd-")+5; i < line.size(); ++i)
                {
                    if (line[i] == '/' && line[i+1] == '>')
                    {
                        break;
                    }
                    name += line[i];
                }

                cout << tree << "found! - " << name << ": " << '\n';
                
                string upperName = "";
                for (auto & c: name) upperName += toupper(c);
                exitFile += "<!-- START " + upperName + " -->\n";
                getHtml(name, tree + "\t");
                exitFile += "<!-- STOP  " + upperName + " -->\n";
            }
            else if(line.find("<atdr/>") != std::string::npos){
                string name = "";
                if (gc >= gci)
                {
                    name = gar[gci];
                    ++gci;
                }
                else{
                    cerr << "paramatre eksik - " << name << " - " << filePath << " - " << gci << endl;
                }
                

                cout << tree << "found! - " << name << ": " << '\n';
                
                string upperName = "";
                for (auto & c: name) upperName += toupper(c);
                exitFile += "<!-- START " + upperName + " R-->\n";
                getHtml(name, tree + "\t");
                exitFile += "<!-- STOP  " + upperName + " R-->\n";
            }
            else{
                exitFile += line + "\n";
            }
            
        }
        myfile.close();
        cout << tree << "Finish." << endl; 
    }
    else cout << tree << "Unable to open file"; 

}

void setHtml(string name){
    ofstream myfile("output/" + name + ".html");

    if (myfile.is_open() ){
        myfile << exitFile;
        myfile.close();
    }
    else cout << "Dosya olusturulamadı!" << endl;
}

int main(int argc, char** argv) {
    cout << "Start: HtmlCreator - " << argc << " - " << argv[1] << endl << endl;
    gc = argc;
    gci = 2;
    gar = argv;

    getHtml("main","");

    setHtml(argv[1]);

    //cout << endl << endl << exitFile << endl << endl;
    cout << endl;
    return 0;
}