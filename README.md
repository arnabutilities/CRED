# CRED
Repository for simple CRED operation with mysql+spring-boot-JPA+angular+docker

## Steps to deploy application in a new VM

### System requirements

#### Software requirements

```
1. Docker version 19.03.11 and docker-compose
2. node V14.4.0 & npm 6.14.5
3. angular stack

     _                      _                 ____ _     ___ 
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 10.0.4
Node: 14.4.0
OS: linux x64

Angular:
...
Ivy Workspace:

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1000.4
@angular-devkit/core         10.0.4
@angular-devkit/schematics   10.0.4
@schematics/angular          10.0.4
@schematics/update           0.1000.4
rxjs                         6.5.5

4. JAVA and Maven

Apache Maven 3.0.5 (Red Hat 3.0.5-17)
Maven home: /usr/share/maven
Java version: 1.8.0_252, vendor: Oracle Corporation
Java home: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.252.b09-2.el7_8.x86_64/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "3.10.0-1127.el7.x86_64", arch: "amd64", family: "unix"
```
I have deployed this application on oracle VirtualBox centos 7 VM. As these services runs in docker containers, so it will work on any system with docker and docker compose. **maven and angular cli is needed for building the application. I am committing the angular dist directory and spring boot target jar files, in case we want to avoid building the services**.

#### Code Repository and branches

```
GitHub repository details:

HTTP URL: https://github.com/arnabutilities/CRED [https://github.com/arnabutilities/CRED]

git clone git@github.com:arnabutilities/CRED.git
switch to branch "development"
```
for reference my repo is set to below path:
/home/arnab/dev/CRED

#### Building frontend

```
cd CRED/frontend/CREDWebUi/
npm install
npm install -g @angular/cli
npm run build

one dist directory will be generated.
```

#### Building backend

```
cd CRED/api-backend/config
docker-compose up -d

please wait till mysql server starts properly
vi CRED/api-backend/lead-crm/src/main/resources/application.properties
change spring.datasource.url=jdbc:mysql://192.168.0.103:3306/tinycrm to spring.datasource.url=jdbc:mysql://<VIRTUAL_MACHINE_IP>:3306/tinycrm
exit vi editor

cd CRED/api-backend/lead-crm
mvn clean package spring-boot:repackage

gracefully shutdown mysql docker instance.
cd CRED/api-backend/config
docker-compose down

```

#### Start the application

```
cd CRED/config
docker-compose up -d
please wait few minutes till spring nginx and mysql server starts completely.
open a browser in your host machine for VM.
provide http://<VIRTUAL_MACHINE_IP>/frontend in address bar.
this will open the application in browser window
```
NOTE: make sure port 80 is open and available. incase continuous db connection failure, please stop firewall or whitelist ports used in application

```
systemctl stop firewalld
```


