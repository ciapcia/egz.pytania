// Baza pytań do quizu
const QUESTIONS = [
  {
    "id": 1,
    "question": "Które urządzenie działa głównie w warstwie sieciowej modelu OSI?",
    "options": [
      {
        "letter": "A",
        "text": "Switch"
      },
      {
        "letter": "B",
        "text": "Hub"
      },
      {
        "letter": "C",
        "text": "Router"
      },
      {
        "letter": "D",
        "text": "Repeater"
      }
    ],
    "correct_option": "C",
    "explanation": "Router działa w warstwie sieciowej (warstwa 3) modelu OSI, gdzie odpowiada za trasowanie pakietów na podstawie adresów IP.",
    "category": "networking"
  },
  {
    "id": 2,
    "question": "Jakie rozszerzenie mają pliki wykonywalne w systemie Windows?",
    "options": [
      {
        "letter": "A",
        "text": ".txt"
      },
      {
        "letter": "B",
        "text": ".exe"
      },
      {
        "letter": "C",
        "text": ".bat"
      },
      {
        "letter": "D",
        "text": ".sys"
      }
    ],
    "correct_option": "B",
    "explanation": "Pliki wykonywalne (aplikacje) w systemie Windows mają standardowe rozszerzenie `.exe` (od angielskiego *executable*).",
    "category": "operating_systems"
  },
  {
    "id": 3,
    "question": "Polecenie ipconfig w Windows służy do:",
    "options": [
      {
        "letter": "A",
        "text": "formatowania dysku"
      },
      {
        "letter": "B",
        "text": "konfiguracji BIOS"
      },
      {
        "letter": "C",
        "text": "wyświetlania konfiguracji sieciowej"
      },
      {
        "letter": "D",
        "text": "usuwania użytkowników"
      }
    ],
    "correct_option": "C",
    "explanation": "Polecenie `ipconfig` służy do odczytywania oraz podstawowej konfiguracji adresów IP oraz innych parametrów interfejsów sieciowych w Windows.",
    "category": "networking"
  },
  {
    "id": 4,
    "question": "Który adres IP należy do klasy prywatnej?",
    "options": [
      {
        "letter": "A",
        "text": "8.8.8.8"
      },
      {
        "letter": "B",
        "text": "172.16.1.1"
      },
      {
        "letter": "C",
        "text": "193.168.1.1"
      },
      {
        "letter": "D",
        "text": "11.0.0.1"
      }
    ],
    "correct_option": "B",
    "explanation": "Adresy z zakresu od 172.16.0.0 do 172.31.255.255 należą do klasy B prywatnych adresów IP.",
    "category": "networking"
  },
  {
    "id": 5,
    "question": "Które medium transmisyjne jest odporne na zakłócenia elektromagnetyczne?",
    "options": [
      {
        "letter": "A",
        "text": "Skrętka UTP"
      },
      {
        "letter": "B",
        "text": "Kabel koncentryczny"
      },
      {
        "letter": "C",
        "text": "Światłowód"
      },
      {
        "letter": "D",
        "text": "Skrętka FTP"
      }
    ],
    "correct_option": "C",
    "explanation": "Światłowód przesyła dane za pomocą fali świetlnej wewnątrz szklanego włókna, dzięki czemu jest całkowicie odporny na zakłócenia elektromagnetyczne.",
    "category": "networking"
  },
  {
    "id": 6,
    "question": "Co oznacza skrót DHCP?",
    "options": [
      {
        "letter": "A",
        "text": "Dynamic Host Configuration Protocol"
      },
      {
        "letter": "B",
        "text": "Data Host Communication Process"
      },
      {
        "letter": "C",
        "text": "Direct Host Configuration Port"
      },
      {
        "letter": "D",
        "text": "Dynamic Hardware Control Process"
      }
    ],
    "correct_option": "A",
    "explanation": "DHCP (Dynamic Host Configuration Protocol) to protokół sieciowy służący do automatycznego przydzielania adresów IP i konfiguracji sieciowej hostom.",
    "category": "networking"
  },
  {
    "id": 7,
    "question": "Który port domyślnie wykorzystuje HTTP?",
    "options": [
      {
        "letter": "A",
        "text": "21"
      },
      {
        "letter": "B",
        "text": "25"
      },
      {
        "letter": "C",
        "text": "80"
      },
      {
        "letter": "D",
        "text": "443"
      }
    ],
    "correct_option": "C",
    "explanation": "Protokół HTTP (Hypertext Transfer Protocol) używa domyślnie portu TCP 80 do przesyłania nieszyfrowanych stron internetowych.",
    "category": "networking"
  },
  {
    "id": 8,
    "question": "Jakie polecenie w Linuxie wyświetli zawartość katalogu?",
    "options": [
      {
        "letter": "A",
        "text": "dir"
      },
      {
        "letter": "B",
        "text": "show"
      },
      {
        "letter": "C",
        "text": "ls"
      },
      {
        "letter": "D",
        "text": "netstat"
      }
    ],
    "correct_option": "C",
    "explanation": "Polecenie `ls` (skrót od *list*) w systemie Linux służy do wylistowania zawartości bieżącego lub wskazanego katalogu.",
    "category": "operating_systems"
  },
  {
    "id": 9,
    "question": "Główną funkcją switcha jest:",
    "options": [
      {
        "letter": "A",
        "text": "wzmacnianie sygnału"
      },
      {
        "letter": "B",
        "text": "przełączanie ramek w sieci LAN"
      },
      {
        "letter": "C",
        "text": "filtrowanie wirusów"
      },
      {
        "letter": "D",
        "text": "przydzielanie adresów IP"
      }
    ],
    "correct_option": "B",
    "explanation": "Przełącznik (switch) analizuje adresy fizyczne MAC w ramkach ethernetowych i przesyła je bezpośrednio do odpowiedniego portu docelowego w sieci LAN.",
    "category": "networking"
  },
  {
    "id": 10,
    "question": "BIOS/UEFI odpowiada za:",
    "options": [
      {
        "letter": "A",
        "text": "edycję dokumentów"
      },
      {
        "letter": "B",
        "text": "uruchamianie systemu operacyjnego"
      },
      {
        "letter": "C",
        "text": "zarządzanie drukarką"
      },
      {
        "letter": "D",
        "text": "konfigurację domeny"
      }
    ],
    "correct_option": "B",
    "explanation": "BIOS (Basic Input/Output System) lub nowszy standard UEFI to podstawowe oprogramowanie układowe uruchamiające sprzęt i inicjujące ładowanie systemu operacyjnego.",
    "category": "hardware"
  },
  {
    "id": 11,
    "question": "Który system plików obsługuje uprawnienia i duże pliki w Windows?",
    "options": [
      {
        "letter": "A",
        "text": "FAT16"
      },
      {
        "letter": "B",
        "text": "FAT32"
      },
      {
        "letter": "C",
        "text": "NTFS"
      },
      {
        "letter": "D",
        "text": "EXT4"
      }
    ],
    "correct_option": "C",
    "explanation": "NTFS to nowoczesny system plików Windows obsługujący zaawansowane uprawnienia bezpieczeństwa (ACL) oraz pliki o rozmiarze powyżej 4 GB.",
    "category": "operating_systems"
  },
  {
    "id": 12,
    "question": "Polecenie ping służy do:",
    "options": [
      {
        "letter": "A",
        "text": "sprawdzania połączenia sieciowego"
      },
      {
        "letter": "B",
        "text": "szyfrowania danych"
      },
      {
        "letter": "C",
        "text": "instalacji sterowników"
      },
      {
        "letter": "D",
        "text": "tworzenia użytkowników"
      }
    ],
    "correct_option": "A",
    "explanation": "Narzędzie `ping` wysyła pakiety ICMP Echo Request do hosta docelowego w celu sprawdzenia dostępności i opóźnień w sieci.",
    "category": "networking"
  },
  {
    "id": 13,
    "question": "Jaka maska odpowiada sieci /24?",
    "options": [
      {
        "letter": "A",
        "text": "255.0.0.0"
      },
      {
        "letter": "B",
        "text": "255.255.0.0"
      },
      {
        "letter": "C",
        "text": "255.255.255.0"
      },
      {
        "letter": "D",
        "text": "255.255.255.255"
      }
    ],
    "correct_option": "C",
    "explanation": "Maska `/24` oznacza, że pierwsze 24 bity są ustawione na 1 (część sieciowa), co w zapisie dziesiętnym odpowiada masce 255.255.255.0.",
    "category": "networking"
  },
  {
    "id": 14,
    "question": "Który protokół służy do bezpiecznego przesyłania plików?",
    "options": [
      {
        "letter": "A",
        "text": "FTP"
      },
      {
        "letter": "B",
        "text": "TFTP"
      },
      {
        "letter": "C",
        "text": "SFTP"
      },
      {
        "letter": "D",
        "text": "HTTP"
      }
    ],
    "correct_option": "C",
    "explanation": "SFTP (SSH File Transfer Protocol) to bezpieczny protokół przesyłania plików, który szyfruje całą sesję przy użyciu protokołu SSH (zazwyczaj port 22).",
    "category": "networking"
  },
  {
    "id": 15,
    "question": "Co oznacza RAID 1?",
    "options": [
      {
        "letter": "A",
        "text": "Striping"
      },
      {
        "letter": "B",
        "text": "Mirroring"
      },
      {
        "letter": "C",
        "text": "Parzystość"
      },
      {
        "letter": "D",
        "text": "Backup offline"
      }
    ],
    "correct_option": "B",
    "explanation": "RAID 1 polega na lustrzanym kopiarowaniu (mirroring) danych na co najmniej dwóch dyskach, co chroni przed utratą danych w razie awarii jednego z nich.",
    "category": "networking"
  },
  {
    "id": 16,
    "question": "Które polecenie w Windows sprawdzi trasę pakietów?",
    "options": [
      {
        "letter": "A",
        "text": "ping"
      },
      {
        "letter": "B",
        "text": "tracert"
      },
      {
        "letter": "C",
        "text": "net user"
      },
      {
        "letter": "D",
        "text": "diskpart"
      }
    ],
    "correct_option": "B",
    "explanation": "Narzędzie `tracert` (traceroute w systemie Linux) służy do śledzenia trasy (kolejnych routerów), przez którą pakiety przechodzą do celu.",
    "category": "networking"
  },
  {
    "id": 17,
    "question": "DNS służy do:",
    "options": [
      {
        "letter": "A",
        "text": "przydzielania adresów MAC"
      },
      {
        "letter": "B",
        "text": "tłumaczenia nazw domen na adresy IP"
      },
      {
        "letter": "C",
        "text": "szyfrowania danych"
      },
      {
        "letter": "D",
        "text": "konfiguracji switcha"
      }
    ],
    "correct_option": "B",
    "explanation": "DNS (Domain Name System) odpowiada za tłumaczenie czytelnych dla ludzi nazw domenowych (np. google.com) na numeryczne adresy IP komputerów.",
    "category": "networking"
  },
  {
    "id": 18,
    "question": "Jaki kabel najczęściej stosuje się do połączenia komputera ze switchem?",
    "options": [
      {
        "letter": "A",
        "text": "crossover"
      },
      {
        "letter": "B",
        "text": "prosty (straight-through)"
      },
      {
        "letter": "C",
        "text": "koncentryczny"
      },
      {
        "letter": "D",
        "text": "światłowód jednomodowy"
      }
    ],
    "correct_option": "B",
    "explanation": "Kabel prosty (straight-through) łączy urządzenia działające w różnych warstwach modelu OSI, np. komputer (warstwa 3/7) z przełącznikiem (warstwa 2).",
    "category": "networking"
  },
  {
    "id": 19,
    "question": "Który port jest domyślny dla HTTPS?",
    "options": [
      {
        "letter": "A",
        "text": "20"
      },
      {
        "letter": "B",
        "text": "80"
      },
      {
        "letter": "C",
        "text": "110"
      },
      {
        "letter": "D",
        "text": "443"
      }
    ],
    "correct_option": "D",
    "explanation": "Protokół HTTPS (szyfrowana wersja HTTP) korzysta z bezpiecznego protokołu szyfrującego TLS/SSL i domyślnie nasłuchuje na porcie TCP 443.",
    "category": "networking"
  },
  {
    "id": 20,
    "question": "Polecenie passwd w Linuxie służy do:",
    "options": [
      {
        "letter": "A",
        "text": "restartu systemu"
      },
      {
        "letter": "B",
        "text": "zmiany hasła użytkownika"
      },
      {
        "letter": "C",
        "text": "tworzenia folderu"
      },
      {
        "letter": "D",
        "text": "sprawdzania RAM"
      }
    ],
    "correct_option": "B",
    "explanation": "W systemie Linux polecenie `passwd` umożliwia użytkownikowi zmianę swojego hasła, a administratorowi zmianę hasła dowolnego konta.",
    "category": "operating_systems"
  },
  {
    "id": 21,
    "question": "Które polecenie w systemie Linux wyświetli aktywne interfejsy sieciowe wraz z adresami IP?",
    "options": [
      {
        "letter": "A",
        "text": "lsblk"
      },
      {
        "letter": "B",
        "text": "ip a"
      },
      {
        "letter": "C",
        "text": "passwd"
      },
      {
        "letter": "D",
        "text": "chmod"
      }
    ],
    "correct_option": "B",
    "explanation": "Polecenie `ip a` (skrót od `ip address show`) wyświetla konfigurację i status wszystkich interfejsów sieciowych w systemie Linux.",
    "category": "networking"
  },
  {
    "id": 22,
    "question": "Administrator skonfigurował hostowi adres 192.168.10.77/27. Który zestaw zawiera poprawny adres sieci i broadcast?",
    "options": [
      {
        "letter": "A",
        "text": "192.168.10.64 oraz 192.168.10.95"
      },
      {
        "letter": "B",
        "text": "192.168.10.32 oraz 192.168.10.63"
      },
      {
        "letter": "C",
        "text": "192.168.10.64 oraz 192.168.10.127"
      },
      {
        "letter": "D",
        "text": "192.168.10.77 oraz 192.168.10.95"
      }
    ],
    "correct_option": "A",
    "explanation": "Maska /27 (255.255.255.224) dzieli podsieć na części po 32 adresy. Dla hosta .77 podsieć zaczyna się na .64 (sieć), a kończy na .95 (rozgłoszeniowy).",
    "category": "networking"
  },
  {
    "id": 23,
    "question": "Administrator chce sprawdzić, które porty są otwarte na lokalnym komputerze Windows i jaki proces ich używa. Najbardziej odpowiednie polecenie to:",
    "options": [
      {
        "letter": "A",
        "text": "ping -a"
      },
      {
        "letter": "B",
        "text": "ipconfig /all"
      },
      {
        "letter": "C",
        "text": "netstat -ano"
      },
      {
        "letter": "D",
        "text": "hostname"
      }
    ],
    "correct_option": "C",
    "explanation": "Polecenie `netstat -ano` wyświetla aktywne połączenia sieciowe wraz z otwartymi portami (a), nazwami numerycznymi (n) oraz numerami PID procesów (o).",
    "category": "networking"
  },
  {
    "id": 24,
    "question": "Które polecenie Linux wyświetli użycie miejsca na systemach plików?",
    "options": [
      {
        "letter": "A",
        "text": "free"
      },
      {
        "letter": "B",
        "text": "df -h"
      },
      {
        "letter": "C",
        "text": "fdisk -l"
      },
      {
        "letter": "D",
        "text": "route"
      }
    ],
    "correct_option": "B",
    "explanation": "Polecenie `df -h` (disk free -human-readable) pokazuje wolne i zajęte miejsce na zamontowanych systemach plików w czytelnym formacie (np. GB, MB).",
    "category": "operating_systems"
  },
  {
    "id": 25,
    "question": "Administrator chce znaleźć trasę pakietów do serwera w Windows. Użyje:",
    "options": [
      {
        "letter": "A",
        "text": "arp -a"
      },
      {
        "letter": "B",
        "text": "pathping lub tracert"
      },
      {
        "letter": "C",
        "text": "gpresult"
      },
      {
        "letter": "D",
        "text": "diskpart"
      }
    ],
    "correct_option": "B",
    "explanation": "Programy `tracert` oraz `pathping` wysyłają pakiety ICMP do kolejnych routerów na trasie, aby pokazać całą ścieżkę do hosta docelowego.",
    "category": "networking"
  },
  {
    "id": 26,
    "question": "Administrator podzielił sieć 192.168.50.0/24 na podsieci dla minimum 14 hostów każda, zachowując możliwie najmniejsze marnowanie adresów. Jakiej maski powinien użyć?",
    "options": [
      {
        "letter": "A",
        "text": "/27"
      },
      {
        "letter": "B",
        "text": "/28"
      },
      {
        "letter": "C",
        "text": "/29"
      },
      {
        "letter": "D",
        "text": "/26"
      }
    ],
    "correct_option": "B",
    "explanation": "Dla minimum 14 hostów potrzebujemy 4 bitów na adresację hostów ($2^4 - 2 = 14$ adresów). Zatem na sieć zostaje 32 - 4 = 28 bitów (maska /28).",
    "category": "networking"
  },
  {
    "id": 27,
    "question": "Jakie rozszerzenie mają pliki pakietów instalacyjnych aplikacji w systemie Android? (Przeciek od: murzyn)",
    "options": [
      {
        "letter": "A",
        "text": ".apk"
      },
      {
        "letter": "B",
        "text": ".exe"
      },
      {
        "letter": "C",
        "text": ".deb"
      },
      {
        "letter": "D",
        "text": ".ipa"
      }
    ],
    "correct_option": "A",
    "explanation": "Pliki pakietów instalacyjnych aplikacji dla systemu operacyjnego Android mają rozszerzenie `.apk` (Android Package Kit).",
    "category": "hardware"
  },
  {
    "id": 28,
    "question": "W programie Cisco Packet Tracer, jakie domyślne rozszerzenie posiada standardowy plik projektu? (Przeciek od: LSD)",
    "options": [
      {
        "letter": "A",
        "text": ".pkt"
      },
      {
        "letter": "B",
        "text": ".pka"
      },
      {
        "letter": "C",
        "text": ".pkz"
      },
      {
        "letter": "D",
        "text": ".cisco"
      }
    ],
    "correct_option": "A",
    "explanation": "Standardowy plik projektu programu Cisco Packet Tracer ma rozszerzenie `.pkt`. Pliki `.pka` to zadania z ocenianiem, a `.pkz` to spakowane projekty.",
    "category": "networking"
  },
  {
    "id": 29,
    "question": "Które z poniższych urządzeń sieciowych domyślnie dzieli sieć na osobne domeny kolizyjne dla każdego swojego portu, ale pozostaje w jednej domenie rozgłoszeniowej? (Przeciek od: Alexiei / LSD)",
    "options": [
      {
        "letter": "A",
        "text": "Hub"
      },
      {
        "letter": "B",
        "text": "Switch"
      },
      {
        "letter": "C",
        "text": "Router"
      },
      {
        "letter": "D",
        "text": "Repeater"
      }
    ],
    "correct_option": "B",
    "explanation": "Switch dzieli sieć na osobne domeny kolizyjne na każdym swoim porcie, ale pozostaje w jednej domenie rozgłoszeniowej (wiadomości broadcast trafiają wszędzie).",
    "category": "networking"
  },
  {
    "id": 30,
    "question": "W systemie Cisco IOS, który znak zachęty (prompt) oznacza, że użytkownik znajduje się w trybie uprzywilejowanym EXEC (Privileged EXEC mode)? (Przeciek od: LSD)",
    "options": [
      {
        "letter": "A",
        "text": "Router>"
      },
      {
        "letter": "B",
        "text": "Router#"
      },
      {
        "letter": "C",
        "text": "Router(config)#"
      },
      {
        "letter": "D",
        "text": "Router(config-if)#"
      }
    ],
    "correct_option": "B",
    "explanation": "Znak `#` (hasz) na końcu nazwy routera oznacza tryb uprzywilejowany (Privileged EXEC). Znak `>` oznacza tryb użytkownika (User EXEC).",
    "category": "networking"
  },
  {
    "id": 31,
    "question": "Które urządzenia w programie Cisco Packet Tracer łączy się najczęściej kablem szeregowym (Serial)? (Przeciek od: LSD / cziki)",
    "options": [
      {
        "letter": "A",
        "text": "Komputer ze switchem"
      },
      {
        "letter": "B",
        "text": "Switch z routerem"
      },
      {
        "letter": "C",
        "text": "Router z drugim routerem"
      },
      {
        "letter": "D",
        "text": "Serwer z hubem"
      }
    ],
    "correct_option": "C",
    "explanation": "W Cisco Packet Tracer routery łączy się najczęściej szeregowo (kablami Serial DTE/DCE) w celu symulacji połączeń WAN na odległość.",
    "category": "networking"
  },
  {
    "id": 32,
    "question": "Jaki port komputera jest portem szeregowym (Serial), a który równoległym (Parallel)? (Przeciek od: czaroo – sprostowanie błędu)",
    "options": [
      {
        "letter": "A",
        "text": "COM to port równoległy, LPT to port USB"
      },
      {
        "letter": "B",
        "text": "COM to port szeregowy, LPT to port równoległy"
      },
      {
        "letter": "C",
        "text": "Zarówno COM jak i LPT to porty szeregowe"
      },
      {
        "letter": "D",
        "text": "LPT to port szeregowy, a COM to złącze zasilania"
      }
    ],
    "correct_option": "B",
    "explanation": "Port COM (szeregowy) przesyła dane bit po bitcie szeregowo, natomiast LPT (równoległy) przesyła wiele bitów jednocześnie (używany dawniej do drukarek).",
    "category": "hardware"
  },
  {
    "id": 33,
    "question": "Jaki będzie wynik operacji logicznej XOR na dwóch bajtach zapisanych binarnie: 10101010 XOR 11110000? (Przeciek od: Vulpi)",
    "options": [
      {
        "letter": "A",
        "text": "01010101"
      },
      {
        "letter": "B",
        "text": "01011010"
      },
      {
        "letter": "C",
        "text": "11111010"
      },
      {
        "letter": "D",
        "text": "10100000"
      }
    ],
    "correct_option": "B",
    "explanation": "Operacja XOR (Exclusive OR) daje wynik 1 tylko wtedy, gdy bity są różne. Zatem 10101010 XOR 11110000 daje 01011010.",
    "category": "logic_math"
  },
  {
    "id": 34,
    "question": "Ile bitów sieciowych (wartość w notacji CIDR) posiada maska podsieci, jeśli jej zapis dziesiętny to 255.255.255.224? (Przeciek od: Kroxu / MarlonStojek)",
    "options": [
      {
        "letter": "A",
        "text": "/25"
      },
      {
        "letter": "B",
        "text": "/26"
      },
      {
        "letter": "C",
        "text": "/27"
      },
      {
        "letter": "D",
        "text": "/28"
      }
    ],
    "correct_option": "C",
    "explanation": "Maska 255.255.255.224 ma w ostatnim oktecie 3 bity sieciowe (128+64+32=224). W notacji CIDR daje to 24 + 3 = /27.",
    "category": "networking"
  },
  {
    "id": 35,
    "question": "Program CPU-Z w zakładce SPD pozwala odczytać parametry kości RAM. Z poziomu tej zakładki dowiesz się: (Przeciek od: Vulpi)",
    "options": [
      {
        "letter": "A",
        "text": "Jaka jest aktualna temperatura procesora"
      },
      {
        "letter": "B",
        "text": "Jaki system plików posiada dysk twardy"
      },
      {
        "letter": "C",
        "text": "Ile modułów pamięci RAM zainstalowano w slotach oraz jaki jest ich rozmiar"
      },
      {
        "letter": "D",
        "text": "Jaki adres IP posiada karta sieciowa"
      }
    ],
    "correct_option": "C",
    "explanation": "Zakładka SPD (Serial Presence Detect) w programie CPU-Z odczytuje parametry zapisane w pamięci EEPROM modułu RAM (np. pojemność, producenta, taktowania).",
    "category": "hardware"
  },
  {
    "id": 36,
    "question": "Wskaż standardowy format (rozszerzenie) służący do zapisu i eksportu numerów kontaktowych (książki telefonicznej): (Przeciek od: Vulpi)",
    "options": [
      {
        "letter": "A",
        "text": ".txt"
      },
      {
        "letter": "B",
        "text": ".html"
      },
      {
        "letter": "C",
        "text": ".vcf"
      },
      {
        "letter": "D",
        "text": ".cfg"
      }
    ],
    "correct_option": "C",
    "explanation": "Format `.vcf` (Virtual Card File) to standardowy format zapisu wizytówek elektronicznych i eksportu kontaktów telefonicznych.",
    "category": "hardware"
  },
  {
    "id": 37,
    "question": "Jakie rozszerzenie posiadają standardowe skrypty powłoki tworzone i uruchamiane w systemie Linux? (Przeciek od: MarlonStojek)",
    "options": [
      {
        "letter": "A",
        "text": ".bat"
      },
      {
        "letter": "B",
        "text": ".sh"
      },
      {
        "letter": "C",
        "text": ".exe"
      },
      {
        "letter": "D",
        "text": ".ps1"
      }
    ],
    "correct_option": "B",
    "explanation": "Skrypty powłoki (np. Bash) w systemie Linux posiadają rozszerzenie `.sh`. Rozszerzenie `.bat` to skrypty Windows, a `.ps1` to PowerShell.",
    "category": "operating_systems"
  },
  {
    "id": 38,
    "question": "Czym jest oprogramowanie Comarch ERP (np. Optima)? (Przeciek od: 18. Ślężański Panas Półmaraton)",
    "options": [
      {
        "letter": "A",
        "text": "Programem antywirusowym"
      },
      {
        "letter": "B",
        "text": "Środowiskiem programistycznym"
      },
      {
        "letter": "C",
        "text": "Zintegrowanym systemem informatycznym do zarządzania firmą"
      },
      {
        "letter": "D",
        "text": "Narzędziem do partycjonowania dysków"
      }
    ],
    "correct_option": "C",
    "explanation": "Comarch ERP Optima to polski system klasy ERP wspierający zarządzanie procesami biznesowymi w firmie, np. księgowość, kadry, płace czy magazyn.",
    "category": "operating_systems"
  },
  {
    "id": 39,
    "question": "Jaki typ złącza (skrót jedno-literowy) był widoczny jako label na filmie egzaminacyjnym dotyczącym instalacji telewizji satelitarnej? (Przeciek tekstowy z Twojej wiadomości)",
    "options": [
      {
        "letter": "A",
        "text": "Złącze RJ"
      },
      {
        "letter": "B",
        "text": "Złącze X"
      },
      {
        "letter": "C",
        "text": "Wtyk F"
      },
      {
        "letter": "D",
        "text": "Złącze B"
      }
    ],
    "correct_option": "C",
    "explanation": "Wtyk typu F (złącze F) to popularne złącze gwintowane stosowane do łączenia kabli koncentrycznych w instalacjach telewizji satelitarnej i kablowej.",
    "category": "hardware"
  },
  {
    "id": 40,
    "question": "Celowe publikowanie w mediach społecznościowych lub na forach internetowych napastliwych, kontrowersyjnych czy niezgodnych z tematem wiadomości w celu zdenerwowania innych użytkowników i sprowokowania kłótni to definicja zjawiska określanego jako:",
    "options": [
      {
        "letter": "A",
        "text": "Cyberbumping"
      },
      {
        "letter": "B",
        "text": "Trolling (trollowanie)"
      },
      {
        "letter": "C",
        "text": "Phishing"
      },
      {
        "letter": "D",
        "text": "Spoofing"
      }
    ],
    "correct_option": "B",
    "explanation": "Trolling polega na celowym publikowaniu prowokacyjnych, obraźliwych lub niezgodnych z tematem wpisów w celu wywołania emocjonalnej reakcji i kłótni.",
    "category": "security_law"
  },
  {
    "id": 41,
    "question": "Który element elektroniczny umieszczony na płycie głównej komputera odpowiada za czasowe gromadzenie ładunku elektrycznego i wyrównywanie napięcia? (Przeciek od: OSM.)",
    "options": [
      {
        "letter": "A",
        "text": "Rezystor (opornik)"
      },
      {
        "letter": "B",
        "text": "Kondensator"
      },
      {
        "letter": "C",
        "text": "Dioda prostownicza"
      },
      {
        "letter": "D",
        "text": "Transystor"
      }
    ],
    "correct_option": "B",
    "explanation": "Kondensator gromadzi ładunek elektryczny i służy do stabilizowania oraz filtrowania napięcia zasilania podzespołów na płycie głównej.",
    "category": "hardware"
  },
  {
    "id": 42,
    "question": "Jak nazywa się główny punkt rozdzielczy okablowania strukturalnego w budynku (np. kampusowym), w którym zbiegają się linie magistralne i znajdują się główne urządzenia sieciowe? (Przeciek od: OSM. / kurek)",
    "options": [
      {
        "letter": "A",
        "text": "IDF (Intermediate Distribution Frame)"
      },
      {
        "letter": "B",
        "text": "MDF (Main Distribution Frame)"
      },
      {
        "letter": "C",
        "text": "HCC (Horizontal Cross-Connect)"
      },
      {
        "letter": "D",
        "text": "POP (Point of Presence)"
      }
    ],
    "correct_option": "B",
    "explanation": "MDF (Main Distribution Frame) to główny punkt rozdzielczy w budynku, łączący wewnętrzne okablowanie strukturalne z zewnętrznymi liniami WAN.",
    "category": "networking"
  },
  {
    "id": 43,
    "question": "Jaki zestaw sygnałów należy podać na wejścia trójwejściowej bramki logicznej NAND, aby na jej wyjściu uzyskać stan niskiego poziomu logicznego (0)? (Przeciek od: OSM.)",
    "options": [
      {
        "letter": "A",
        "text": "0, 0, 0"
      },
      {
        "letter": "B",
        "text": "1, 0, 1"
      },
      {
        "letter": "C",
        "text": "0, 1, 1"
      },
      {
        "letter": "D",
        "text": "1, 1, 1"
      }
    ],
    "correct_option": "D",
    "explanation": "Bramka NAND daje na wyjściu logiczne 0 tylko wtedy, gdy na wszystkich wejściach panuje stan wysoki (1). Zatem dla wejść 1, 1, 1 wynik to 0.",
    "category": "logic_math"
  },
  {
    "id": 44,
    "question": "Jak nazywa się specyficzny rodzaj oprogramowania wbudowanego na stałe w urządzenie sprzętowe (np. zapisany w pamięci ROM płyty głównej, routera czy dysku twardego), które zapewnia podstawowe procedury sterowania tym urządzeniem? (Przeciek od: Vulpi)",
    "options": [
      {
        "letter": "A",
        "text": "Freeware"
      },
      {
        "letter": "B",
        "text": "Shareware"
      },
      {
        "letter": "C",
        "text": "Firmware"
      },
      {
        "letter": "D",
        "text": "Malware"
      }
    ],
    "correct_option": "C",
    "explanation": "Firmware to oprogramowanie wbudowane bezpośrednio w pamięć stałą urządzenia sprzętowego (ROM/Flash), sterujące jego podstawowym działaniem.",
    "category": "hardware"
  },
  {
    "id": 45,
    "question": "Programy szpiegujące, które bez wiedzy użytkownika instalują się w systemie, monitorują jego działania, zbierają prywatne dane (np. wpisywane hasła) i wysyłają je autorowi złośliwego kodu, to: (Przeciek od: bernattka / OSM.)",
    "options": [
      {
        "letter": "A",
        "text": "Ransomware"
      },
      {
        "letter": "B",
        "text": "Adware"
      },
      {
        "letter": "C",
        "text": "Spyware"
      },
      {
        "letter": "D",
        "text": "Rootkity"
      }
    ],
    "correct_option": "C",
    "explanation": "Spyware to złośliwe oprogramowanie szpiegujące, które rejestruje aktywność użytkownika (np. klawisze w Keyloggerze) i wysyła te dane przestępcom.",
    "category": "security_law"
  },
  {
    "id": 46,
    "question": "Który akt prawny reguluje w Polsce i Unii Europejskiej zasady ochrony osób fizycznych w związku z przetwarzaniem ich danych osobowych, o których wspomniano na czacie? (Przeciek od: whtee_ / OSM.)",
    "options": [
      {
        "letter": "A",
        "text": "Ustawa o prawie autorskim i prawach pokrewnych"
      },
      {
        "letter": "B",
        "text": "RODO (Ogólne rozporządzenie o ochronie danych)"
      },
      {
        "letter": "C",
        "text": "Ustawa o świadczeniu usług drogą elektroniczną"
      },
      {
        "letter": "D",
        "text": "Kodeks Pracy"
      }
    ],
    "correct_option": "B",
    "explanation": "RODO (Ogólne rozporządzenie o ochronie danych) to unijne rozporządzenie regulujące zasady ochrony danych osobowych osób fizycznych.",
    "category": "security_law"
  },
  {
    "id": 47,
    "question": "Do czego w starszych komputerach PC służyły okrągłe, kilku-pinowe złącza typu Mini-DIN (często w kolorze zielonym i fioletowym, zgodne ze standardem PS/2)? (Przeciek od: mikoluss)",
    "options": [
      {
        "letter": "A",
        "text": "Do podłączania monitorów kineskopowych"
      },
      {
        "letter": "B",
        "text": "Do przesyłania cyfrowego sygnału audio"
      },
      {
        "letter": "C",
        "text": "Do podłączania klawiatury i myszy"
      },
      {
        "letter": "D",
        "text": "Do łączenia komputerów w sieć lokalną pisałeś wcześniej! satelitarnego/antenowego) procedura jego zarabiania i montażu zawsze opiera się na kilku sztywnych krokach. operację montażu:"
      }
    ],
    "correct_option": "C",
    "explanation": "Złącza PS/2 (fioletowe dla klawiatury, zielone dla myszy) to starszy standard Mini-DIN służący do podłączania urządzeń wskazujących i wprowadzających.",
    "category": "hardware"
  },
  {
    "id": 48,
    "question": "Jaki element kabla koncentrycznego stanowi wewnętrzny przewodnik (rdzeń) widoczny na zdjęciu, który po nałożeniu wtyku F wystaje bezpośrednio z jego środka i służy jako pin sygnałowy?",
    "options": [
      {
        "letter": "A",
        "text": "Aluminiowa folia ekranująca"
      },
      {
        "letter": "B",
        "text": "Miedziany oplot (ekran)"
      },
      {
        "letter": "C",
        "text": "Jednodrutowa żyła miedziana (wewnętrzna)"
      },
      {
        "letter": "D",
        "text": "Dielektryk z tworzywa sztucznego"
      }
    ],
    "correct_option": "C",
    "explanation": "Rdzeń kabla koncentrycznego to wewnętrzny przewodnik z miedzi jednodrutowej, który przesyła sygnał o wysokiej częstotliwości.",
    "category": "hardware"
  },
  {
    "id": 49,
    "question": "Podczas przygotowywania (zarabiania) kabla koncentrycznego do montażu widocznego na zdjęciu kompresyjnego wtyku F , jakich narzędzi należy użyć, aby poprawnie i bezpiecznie wykonać to zadanie?",
    "options": [
      {
        "letter": "A",
        "text": "Noża zaciskowego LSA oraz lutownicy"
      },
      {
        "letter": "B",
        "text": "Zaciskarki rurkowej i palnika gazowego"
      },
      {
        "letter": "C",
        "text": "Ściągacza izolacji do kabli koncentrycznych oraz zaciskarki kompresyjnej"
      },
      {
        "letter": "D",
        "text": "Kombinerek uniwersalnych i taśmy izolacyjnej"
      }
    ],
    "correct_option": "C",
    "explanation": "Do przygotowania złącza kompresyjnego F na kablu antenowym używa się specjalnego ściągacza izolacji oraz dedykowanej zaciskarki kompresyjnej.",
    "category": "hardware"
  },
  {
    "id": 50,
    "question": "Jaki błąd montażowy podczas zarabiania kabla koncentrycznego może doprowadzić do zwarcia i całkowitego braku sygnału w instalacji satelitarnej?",
    "options": [
      {
        "letter": "A",
        "text": "Zbytnie skrócenie zewnętrznej powłoki PVC"
      },
      {
        "letter": "B",
        "text": "Pozostawienie pojedynczych drucików oplotu (ekranu) stykających się z miedzianą żyłą główną"
      },
      {
        "letter": "C",
        "text": "Mocne dokręcenie wtyku do gniazda tunerka"
      },
      {
        "letter": "D",
        "text": "Użycie dielektryka o białym kolorze"
      }
    ],
    "correct_option": "B",
    "explanation": "Jeśli choćby jeden cienki drucik oplotu (masy) dotknie środkowej żyły miedzianej (sygnałowej), nastąpi zwarcie elektryczne i całkowity brak sygnału.",
    "category": "hardware"
  },
  {
    "id": 51,
    "question": "Widoczne na zdjęciu złącza posiadają zielony pasek i charakterystyczną gładką tuleję, co oznacza, że są to profesjonalne wtyki F montowane metodą:",
    "options": [
      {
        "letter": "A",
        "text": "Nakręcaną (wtyk nakręcany)"
      },
      {
        "letter": "B",
        "text": "Lutowaną (wtyk lutowany)"
      },
      {
        "letter": "C",
        "text": "Zaciskową / Kompresyjną (wtyk kompresyjny)"
      },
      {
        "letter": "D",
        "text": "Szybkozłączną (wtyk wciskany)"
      }
    ],
    "correct_option": "C",
    "explanation": "Gładka tulejka i kolorowy pasek (np. zielony) to cecha charakterystyczna profesjonalnych wtyków F zaciskanych za pomocą zaciskarki kompresyjnej.",
    "category": "hardware"
  },
  {
    "id": 52,
    "question": "Jak nazywa się specyficzny pakiet dodatków instalowany wewnątrz maszyny wirtualnej w programie Oracle VirtualBox, który włącza takie funkcje jak automatyczne skalowanie ekranu, integracja myszy oraz współdzielony schowek między systemem-hostem a gościem?",
    "options": [
      {
        "letter": "A",
        "text": "VirtualBox Bootloader"
      },
      {
        "letter": "B",
        "text": "VirtualBox Core Expansion"
      },
      {
        "letter": "C",
        "text": "VirtualBox Guest Additions"
      },
      {
        "letter": "D",
        "text": "VirtualBox Hypervisor Tools"
      }
    ],
    "correct_option": "C",
    "explanation": "Guest Additions to pakiet sterowników instalowany na maszynie wirtualnej w VirtualBox w celu poprawy integracji z hostem (np. płynne skalowanie ekranu, wspólny schowek).",
    "category": "operating_systems"
  },
  {
    "id": 53,
    "question": "Podczas konfiguracji sieci dla maszyny wirtualnej w VirtualBox, który tryb sieciowy (Network Mode) sprawi, że maszyna dostanie adres IP z tej samej podsieci co komputer fizyczny (host) i będzie widoczna w sieci lokalnej jako osobne, niezależne urządzenie?",
    "options": [
      {
        "letter": "A",
        "text": "NAT"
      },
      {
        "letter": "B",
        "text": "Karta mostkowana (Bridged Adapter)"
      },
      {
        "letter": "C",
        "text": "Sieć wewnętrzna (Internal Network)"
      },
      {
        "letter": "D",
        "text": "Izolowana hosta (Host-only Adapter)"
      }
    ],
    "correct_option": "B",
    "explanation": "W trybie mostkowanym (Bridged Adapter) karta wirtualna staje się częścią sieci fizycznej hosta, pobierając adres IP z tej samej podsieci co host.",
    "category": "networking"
  },
  {
    "id": 54,
    "question": "Administrator chce nadać użytkownikowi w systemie Windows uprawnienie do usuwania i zmieniania kolejności wszystkich dokumentów w kolejce drukowania wybranej drukarki sieciowej. Które uprawnienie w zakładce Zabezpieczenia (Security) właściwości drukarki musi mu przypisać?",
    "options": [
      {
        "letter": "A",
        "text": "Drukowanie (Print)"
      },
      {
        "letter": "B",
        "text": "Zarządzanie dokumentami (Manage Documents)"
      },
      {
        "letter": "C",
        "text": "Zarządzanie drukarką (Manage Printers)"
      },
      {
        "letter": "D",
        "text": "Modyfikacja sterowników (Modify Drivers)"
      }
    ],
    "correct_option": "B",
    "explanation": "Uprawnienie 'Zarządzanie dokumentami' (Manage Documents) pozwala użytkownikowi na wstrzymywanie, wznawianie, restartowanie i usuwanie zadań drukowania wszystkich osób.",
    "category": "operating_systems"
  },
  {
    "id": 55,
    "question": "Ile domen kolizyjnych oraz ile domen rozgłoszeniowych tworzy w sieci lokalnej jeden standardowy router posiadający 3 skonfigurowane, aktywne interfejsy LAN (Ethernet)?",
    "options": [
      {
        "letter": "A",
        "text": "1 domena kolizyjna i 3 domeny rozgłoszeniowe"
      },
      {
        "letter": "B",
        "text": "3 domeny kolizyjne i 1 domena rozgłoszeniowa"
      },
      {
        "letter": "C",
        "text": "3 domeny kolizyjne i 3 domeny rozgłoszeniowe"
      },
      {
        "letter": "D",
        "text": "0 domen kolizyjnych i 3 domeny rozgłoszeniowe"
      }
    ],
    "correct_option": "C",
    "explanation": "Każdy fizyczny interfejs routera tworzy oddzielną domenę rozgłoszeniową i kolizyjną. Trzy interfejsy LAN oznaczają zatem 3 domeny kolizyjne i 3 rozgłoszeniowe.",
    "category": "networking"
  },
  {
    "id": 56,
    "question": "W programie Cisco Packet Tracer oraz na schematach logicznych sieci CKE, standardowa ikonka symbolizująca router ma kształt:",
    "options": [
      {
        "letter": "A",
        "text": "Niebieskiego prostopadłościanu z dwiema strzałkami w jedną stronę"
      },
      {
        "letter": "B",
        "text": "Zielonego kwadratu z symbolem pioruna"
      },
      {
        "letter": "C",
        "text": "Płaskiego walca (krążka) z czterema strzałkami rozchodzącymi się na zewnątrz i do środka"
      },
      {
        "letter": "D",
        "text": "Trójkąta z napisem WAN"
      }
    ],
    "correct_option": "C",
    "explanation": "Ikona routera w standardzie Cisco to płaski walec z czterema strzałkami (dwie skierowane do środka, dwie na zewnątrz), symbolizujące trasowanie pakietów.",
    "category": "networking"
  },
  {
    "id": 57,
    "question": "Jak nazywa się typ licencji klienckiej firmy Microsoft (zaczynający się na literę E), udostępniający pakiet zaawansowanych usług i zabezpieczeń dla dużych przedsiębiorstw w modelu subskrypcyjnym?",
    "options": [
      {
        "letter": "A",
        "text": "Enterprise (np. Microsoft 365 E3 / E5)"
      },
      {
        "letter": "B",
        "text": "Essential"
      },
      {
        "letter": "C",
        "text": "Express"
      },
      {
        "letter": "D",
        "text": "Education"
      }
    ],
    "correct_option": "A",
    "explanation": "Subskrypcje Enterprise Microsoft 365 (licencje E3, E5) są przeznaczone dla dużych organizacji, oferując zaawansowane usługi i najwyższy poziom zabezpieczeń.",
    "category": "operating_systems"
  },
  {
    "id": 58,
    "question": "Jaka jest minimalna liczba fizycznych dysków twardych wymagana do zbudowania sprawnej macierzy RAID 6 (zapewniającej podwójne parzystość i odporność na jednoczesną awarię dwóch dysków)?",
    "options": [
      {
        "letter": "A",
        "text": "2"
      },
      {
        "letter": "B",
        "text": "3"
      },
      {
        "letter": "C",
        "text": "4"
      },
      {
        "letter": "D",
        "text": "5"
      }
    ],
    "correct_option": "C",
    "explanation": "Macierz RAID 6 do działania wymaga co najmniej 4 dysków fizycznych, ponieważ przeznacza pojemność odpowiadającą dwóm dyskom na podwójną parzystość.",
    "category": "hardware"
  },
  {
    "id": 59,
    "question": "Na czym polega funkcja DHCP Failover w systemach Windows Server, o którą pojawiło się pytanie na egzaminie?",
    "options": [
      {
        "letter": "A",
        "text": "Na automatycznym szyfrowaniu bazy dzierżaw adresów IP"
      },
      {
        "letter": "B",
        "text": "Na zapewnieniu wysokiej dostępności (niezawodności) poprzez współpracę dwóch serwerów DHCP obsługujących tę samą podsieć"
      },
      {
        "letter": "C",
        "text": "Na blokowaniu nieautoryzowanych urządzeń w sieci LAN"
      },
      {
        "letter": "D",
        "text": "Na konwersji adresów IPv4 do formatu IPv6"
      }
    ],
    "correct_option": "B",
    "explanation": "DHCP Failover umożliwia współpracę dwóch serwerów DHCP (w trybie Load Balance lub Hot Standby) w celu zapewnienia ciągłości działania usługi DHCP.",
    "category": "networking"
  },
  {
    "id": 60,
    "question": "Który niezależny organ państwowy w Polsce odpowiada za kontrolę przestrzegania przepisów o ochronie danych osobowych oraz sprawdza procedury ich przetwarzania w firmach i szkołach?",
    "options": [
      {
        "letter": "A",
        "text": "UOKiK (Urząd Ochrony Konkurencji i Konsumentów)"
      },
      {
        "letter": "B",
        "text": "UODO (Urząd Ochrony Danych Osobowych)"
      },
      {
        "letter": "C",
        "text": "UKE (Urząd Komunikacji Elektronicznej)"
      },
      {
        "letter": "D",
        "text": "KNF (Komisja Nadzoru Finansowego)"
      }
    ],
    "correct_option": "B",
    "explanation": "UODO (Urząd Ochrony Danych Osobowych) to niezależny państwowy organ w Polsce nadzorujący przestrzeganie przepisów o ochronie danych osobowych.",
    "category": "security_law"
  },
  {
    "id": 61,
    "question": "Wykonaj odejmowanie dwóch liczb w systemie binarnym: 1101 - 0110. Jaki będzie wynik tej operacji?",
    "options": [
      {
        "letter": "A",
        "text": "0101"
      },
      {
        "letter": "B",
        "text": "1001"
      },
      {
        "letter": "C",
        "text": "0111"
      },
      {
        "letter": "D",
        "text": "0011"
      }
    ],
    "correct_option": "C",
    "explanation": "Odejmowanie binarne: 1101 (13 dziesiętnie) minus 0110 (6 dziesiętnie) daje wynik 0111 (7 dziesiętnie).",
    "category": "logic_math"
  },
  {
    "id": 62,
    "question": "W jakim celu administrator sieci uruchamia w wierszu poleceń systemu Windows komendę ipconfig /flushdns?",
    "options": [
      {
        "letter": "A",
        "text": "Aby pobrać nowy adres IP z serwera DHCP"
      },
      {
        "letter": "B",
        "text": "Aby zresetować fizyczny interfejs karty sieciowej"
      },
      {
        "letter": "C",
        "text": "Aby całkowicie wyczyścić lokalną pamięć podręczną (cache) programu rozpoznającego nazwy DNS"
      },
      {
        "letter": "D",
        "text": "Aby sprawdzić opóźnienia w pakietach ICMP"
      }
    ],
    "correct_option": "C",
    "explanation": "Czyszczenie pamięci podręcznej DNS (`/flushdns`) usuwa stare lub nieprawidłowe wpisy nazw domenowych, zmuszając system do pobrania świeżych danych z serwerów DNS.",
    "category": "networking"
  },
  {
    "id": 63,
    "question": "Co oznacza zapis MIMO 3x3 (Multiple Input Multiple Output) podawany w specyfikacji technicznej bezprzewodowych punktów dostępowych (Access Point) lub routerów Wi-Fi?",
    "options": [
      {
        "letter": "A",
        "text": "Urządzenie może obsługiwać maksymalnie 3 użytkowników jednocześnie."
      },
      {
        "letter": "B",
        "text": "Sygnał sieci bezprzewodowej jest nadawany na 3 różnych częstotliwościach."
      },
      {
        "letter": "C",
        "text": "Urządzenie wykorzystuje 3 anteny nadawcze i 3 anteny odbiorcze do jednoczesnej transmisji wielu strumieni danych."
      },
      {
        "letter": "D",
        "text": "Sieć Wi-Fi automatycznie przełącza się między 3 poziomami szyfrowania."
      }
    ],
    "correct_option": "C",
    "explanation": "MIMO 3x3 (Multiple Input Multiple Output) oznacza wykorzystanie 3 anten nadawczych i 3 odbiorczych w routerze Wi-Fi do jednoczesnej transmisji wielu strumieni danych.",
    "category": "networking"
  },
  {
    "id": 64,
    "question": "Główna sieć o masce /24 została podzielona na mniejsze podsieci. Trzecia podsieć otrzymała adres sieci z końcówką .64 oraz maskę /27. Na ile maksymalnie podsieci o tej samej wielkości można podzielić całą sieć początkową?",
    "options": [
      {
        "letter": "A",
        "text": "na 2 podsieci"
      },
      {
        "letter": "B",
        "text": "na 4 podsieci"
      },
      {
        "letter": "C",
        "text": "na 8 podsieci"
      },
      {
        "letter": "D",
        "text": "na 16 podsieci"
      }
    ],
    "correct_option": "C",
    "explanation": "Przejście z maski /24 na maskę /27 oznacza pożyczenie 3 bitów na sieć. Liczba utworzonych podsieci wynosi $2^3 = 8$.",
    "category": "networking"
  },
  {
    "id": 65,
    "question": "Administrator dokonał podziału sieci 172.16.0.0 o masce /26 na 4 równe podsieci. Jaką nową maską (w notacji CIDR) będą charakteryzować się nowo powstałe podsieci?",
    "options": [
      {
        "letter": "A",
        "text": "/24"
      },
      {
        "letter": "B",
        "text": "/27"
      },
      {
        "letter": "C",
        "text": "/28"
      },
      {
        "letter": "D",
        "text": "/30"
      }
    ],
    "correct_option": "C",
    "explanation": "Podział podsieci /26 na 4 mniejsze równe części wymaga pożyczenia 2 kolejnych bitów na sieć ($2^2 = 4$). Nowa maska to $26 + 2 = 28$ (/28).",
    "category": "networking"
  }
];
