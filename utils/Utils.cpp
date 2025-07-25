#include <iostream>
#include <iomanip>
#include <bitset>
#include <sstream>
#include <string>
#include <vector>
#include "../headers/Utils.h"

std::vector<std::string> split( std::string text, char delimiter )
{
    std::vector<std::string> tokens;
    std::stringstream textline(text);
    std::string item;
    while (std::getline(textline, item, delimiter)) {
        tokens.push_back(item);
    }
    return tokens;
}

bool ValidNumberOfArgument( int n, std::string mode)
{
    if( mode == "add" )
        return (n == 8);
    else if( mode == "get" || mode == "remove" )
        return (n == 4);
    return false;
}
 
bool ValidArguments( char* argv[], int argc)
{
    std::vector<std::string> arg_values;
    for( int i = 0; i < argc; i++ )
    {
        std::string tmp = argv[i];
        arg_values.push_back(tmp);
    }
    std::vector<std::string> valid_arguments = { "group", "user", "key" };
    std::vector<bool> validation;
    int j = 0;
    for( int i = 2; i < argc; i += 2)
    {
        bool tmp;
        for( const auto& arg : valid_arguments )
        {
            if( arg_values[i] == arg )
            {
                tmp = true;
                break;
            }
            tmp = false;
        }
        validation.push_back(tmp);
        j++;
    }
    for( const auto& item : validation )
    {
        if( !item )
            return false; 
    }
    return true;
}

std::string BinaryToString(std::string data)
{
    if( int(data.size()) % 8 )
        return "Not convertible";

    std::string result;
    for( std::size_t i = 0; i < data.size(); i+=8 )
    {
        std::bitset<8> bits(data.substr(i, 8));
        result+=  static_cast<char>(bits.to_ulong());
    }

    return result;
}

void About()
{
    std::cout << "\033[1m" << "Thanks for using Keyper" << "\033[0m" << std::endl;
    std::cout << "It is a simple commmand line utility to manage your keys locally on linux." << std::endl;
}
 
void Usage()
{
    std::cout << "\033[1m" << "KEYPER USAGE" << "\033[0m" << std::endl;
    std::cout << "How to use it ?" << std::endl;
    std::cout << std::left << " \033[1m" << std::setw(20) << "Add new entry" << "\033[0m" << std::left << std::setw(5) << ": " << "keyper add group <groupname> user <username> key <key>" << std::endl;
    std::cout << std::left << " \033[1m" << std::setw(20) << "Get an entry" << "\033[0m" << std::left << std::setw(5) << ": " << "keyper get [ [group <groupname>] | [user <username>] | [key <key>] ]" << std::endl;
    std::cout << std::left << " \033[1m" << std::setw(20) << "Get all entry" << "\033[0m" << std::left << std::setw(5) << ": " << "keyper get-all" << std::endl;
    std::cout << std::left << " \033[1m" << std::setw(20) << "Remove entry(entries)" << "\033[0m" << std::left << std::setw(5) << ": " << "keyper remove [ [group <groupname>] | [user <username>] | [key <key>] ]" << std::endl;
    std::cout << std::left << " \033[1m" << std::setw(20) << "Setting" << "\033[0m" << std::left << std::setw(5) << ": " << "keyper set-up" << std::endl;
    std::cout << std::left << " \033[1m" << std::setw(20) << "show usage" << "\033[0m" << std::left << std::setw(5) << ": " << "keyper help" << std::endl;
}

void HelpMessage()
{
    std::cout << "type : keyper help " << std::endl;
}

void ExitMessage( std::string mode )
{
    std::cout << "All arguments are required and please check the syntax" << std::endl;
    if( mode == "get" )
        std::cout << "USAGE : get [ [group <groupname>] | [user <username>] | [key <key>] ] " << std::endl;
    else if( mode == "add" )
        std::cout << "USAGE : add group <groupname> user <username> key <key> " << std::endl;
}