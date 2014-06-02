

Create Database

    drop database if exists money;
    create database money;
    grant all privileges on money.* to money@localhost identified by '****';
    grant all privileges on money.* to money@127.0.0.1 identified by '****';
    flush privileges;
