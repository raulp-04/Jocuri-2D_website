import socket
import os
import gzip
import threading

def request_handler(clientsocket, address):
    print('S-a conectat un client.')
    cerere = ''
    linieDeStart = ''
    while True:
        data = clientsocket.recv(1024)
        cerere = cerere + data.decode()
        print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        pozitie = cerere.find('\r\n')
        if (pozitie > -1):
            linieDeStart = cerere[0:pozitie]
            print('S-a citit linia de start din cerere: ##### ' + linieDeStart + '#####')
            break
    print('S-a terminat cititrea.')

    # interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
    nume_fisier = linieDeStart.split()[1]
    nume_fisier = nume_fisier.split('/')
    nume_fisier = nume_fisier[len(nume_fisier)-1]
    dir_path = os.path.dirname(os.path.realpath(__file__))
    dir_path = dir_path[:-10]+'continut' # Intram in directorul ../continut
    exists = False

    dict_extension = {'html': 'text/html', 'css': 'text/css', 'js': 'application/js',
                    'png': 'text/png', 'jpg': 'text/jpeg', 'jpeg': 'text/jpeg',
                    'gif': 'text/gif', 'ico': 'image/x-icon', 'json': 'application/json',
                    'xml': 'application/xml'}

    calea_fisier = ''
    for root, dirs, files in os.walk(dir_path):
        for file in files: 
            if file == nume_fisier: # verificam daca fisierul cerut face parte din director
                exists = True;
                calea_fisier = root + '/' + str(file)

    if exists == False:
        response = 'HTTP/1.1 404 Not Found \r\n\r\n'
        print('Raspunsul trimis: \n' + response)
        response = response.encode()
    else : # generez un raspuns pentru tipul de fisier cerut
        with open(calea_fisier, 'rb') as f:
            content = f.read()

        content_type = dict_extension[nume_fisier.split('.')[1]]
        content_len = len(content)

        response = ('HTTP/1.1 200 OK \r\n' 
        f'Content-Lenght: {content_len}\r\n' 
        'Content-Encoding: gzip\r\n' 
        f'Content-Type: {content_type}\r\n'
        'Server: PRsv\r\n\r\n')
        print('Raspunsul trimis: \n' + response)
        response = response.encode()
        content_gz = gzip.compress(content)
        response += content_gz # adaug fisierul

    # TODO trimiterea răspunsului HTTP
    
    clientsocket.sendall(response)

    # clientsocket.sendall()
    clientsocket.close()
    print('S-a terminat comunicarea cu clientul.')

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.bind(('', 5678 ))
serversocket.listen(5)
while True:
    print('#########################################################################')
    print('Serverul asculta potentiali clienti.')
    (clientsocket, address) = serversocket.accept()
    p = threading.Thread(target=request_handler, args=(clientsocket, address))
    p.start()
    print(f'pid:{os.getpid()} --- ppid:{os.getppid()}\n')