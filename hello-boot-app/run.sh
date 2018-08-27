#!/bin/bash

port=9999
echo "Launching boot app..."
echo "JMX will be accessible via this url: service:jmx:rmi://localhost:${port}/jndi/rmi://localhost:${port}/jmxrmi"

java -Dcom.sun.management.jmxremote \
	-Dcom.sun.management.jmxremote.port=${port} \
	-Dcom.sun.management.jmxremote.authenticate=false \
	-Dcom.sun.management.jmxremote.ssl=false \
	-Djava.rmi.server.hostname=localhost \
	-Dspring.application.admin.enabled=true \
    -jar target/*.jar
