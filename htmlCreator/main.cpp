#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>
#include <Windows.h>
using namespace std;

int gc;
int gci;
char **gar;
string exitFile = "";
string exitLink = "";
string exitScript = "";

#ifdef _WIN32
HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
const string innerP = "┼───";
int routingColor = 14;
#else
const string innerP = "\t";
#endif
const string cBeforeName = "";
const string cEndOfName = "";//" Finish.";


const string cStandart = "<atd-";
const string cRouter = "<atdr/>";
const string cLinkStart = "<atdl>";
const string cLinkEnd = "</atdl>";
const string cScriptStart = "<atds>";
const string cScriptEnd = "</atds>";
const string cLinkEx = "<atdl!/>";
const string cScriptEx = "<atdl!/>";



void getHtml(string filePath, string tree){

    string line;
    ifstream myfile("input/" + filePath + ".html");

    if (myfile.is_open())
    {
        while ( getline (myfile,line) )
        {
            if (line.find(cStandart) != std::string::npos) {
                string name = "";
                for (size_t i = (line.find(cStandart)+cStandart.size()); i < line.size(); ++i)
                {
                    if (line[i] == '/' && line[i+1] == '>')
                    {
                        break;
                    }
                    name += line[i];
                }

                cout << tree << cBeforeName << name << ": " << '\n';
                
                string upperName = "";
                for (auto & c: name) upperName += toupper(c);
                exitFile += "<!-- START " + upperName + " -->\n";
                getHtml(name, tree + innerP);
                exitFile += "<!-- STOP  " + upperName + " -->\n";
            }
            else if(line.find(cRouter) != std::string::npos){
                string name = "";
                if (gc >= gci)
                {
                    name = gar[gci];
                    ++gci;
                }
                else{
                    cerr << "paramatre eksik - " << name << "-" << filePath << " - " << gci << endl;
                }
                

                cout << tree << cBeforeName;
                #ifdef _WIN32
                SetConsoleTextAttribute(hConsole, routingColor);
                --routingColor;
                #endif
                cout << name << ": " << '\n';
                #ifdef _WIN32
                SetConsoleTextAttribute(hConsole, 15);
                #endif

                string upperName = "";
                for (auto & c: name) upperName += toupper(c);
                exitFile += "<!-- START " + upperName + " R-->\n";
                getHtml(name, tree + innerP);
                exitFile += "<!-- STOP  " + upperName + " R-->\n";
            }
            else if(line.find(cLinkStart) != std::string::npos){
                string name = "";
                bool flag = true;
                
                while (flag){
                    getline(myfile,name);
                    if(name.find(cLinkEnd) != std::string::npos){
                        flag = false;
                        break;
                    }
                    else{
                        exitLink += name + "\n";
                    }
                }
                
            }
            else if(line.find(cScriptStart) != std::string::npos){
                string name = "";
                bool flag = true;
                
                while (flag){
                    getline(myfile,name);
                    if(name.find(cScriptEnd) != std::string::npos){
                        flag = false;
                        break;
                    }
                    else{
                        exitScript += name + "\n";
                    }
                }
                
            }
            else{
                exitFile += line + "\n";
            }
        }
        myfile.close();
        if(cEndOfName != "")
            cout << tree.substr(0, (tree.size()-innerP.size())) << cEndOfName << endl; 

    }
    else cout << tree << "Unable to open file"; 

}

void setHtml(string name){
    //ofstream myfile("output/" + name + ".html");
    ofstream myfile("../" + name + ".html");

    if (myfile.is_open() ){
        myfile << exitFile;
        myfile.close();
    }
    else cout << "Dosya olusturulamadı!" << endl;
}

void getLink(){//<atds!/>
    if (exitFile.find(cLinkEx) != std::string::npos) {
        int i = exitFile.find(cLinkEx);
        string temp = exitFile;
        exitFile = temp.substr(0,i);
        exitFile += "<!-- START LINK -->\n";
        exitFile += exitLink;
        exitFile += "<!-- STOP  LINK -->\n";
        exitFile += temp.substr ((i+cLinkEx.size()), temp.size());
    }
    else{
        cout << "Ekstra link yok" << endl;
    }
}

void getScript(){//<atds!/>
    if (exitFile.find(cScriptEx) != std::string::npos) {
        int i = exitFile.find(cScriptEx);
        string temp = exitFile;
        exitFile = temp.substr(0,i);
        exitFile += "<!-- START SCRIPT -->\n";
        exitFile += exitScript;
        exitFile += "<!-- STOP  SCRIPT -->\n";
        exitFile += temp.substr ((i+cScriptEx.size()), temp.size());
    }
    else{
        cout << "Ekstra Script yok" << endl;
    }
}

int main(int argc, char** argv) {
    
    #ifdef _WIN32
        SetConsoleOutputCP(CP_UTF8);
    #endif
    
    cout << endl << "Start: HtmlCreator - " << argv[1] <<  " - " << argc << endl;
    
    gc = argc;
    gci = 2;
    gar = argv;

    getHtml("main", innerP);
    cout << "End: " << argv[1] << endl;
    getLink();
    getScript();
    
    setHtml(argv[1]);

    //cout << endl << endl << exitLink << endl << endl;
    //cout << endl << endl << exitFile << endl << endl;
    cout << endl;
    return 0;
}