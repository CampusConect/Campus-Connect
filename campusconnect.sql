--create table users(
--userid int primary key,
--name varchar(100) not null,
--email varchar(100)  unique not null,
--password varchar(200) not null,
--role1 varchar(20) not null check(role1 in('student','teacher','admin')
--))

--create table student(
--studentid int primary key,
--userid int not null unique,
--rollnum varchar(20) not null unique,
--semester int check (semester>0 and semester<10), --till 9 allowed for repeats
--program varchar(100))

--create table teacher(
--teacherid int primary key,
--userid int not null unique,
--department varchar(100),
--)

--create table admin1(
--adminid int primary key,
--userid int not null unique)

--create table course(
--courseid int primary key,
--coursecode varchar(20) not null unique,
--coursename varchar(100) not null,
--credithours int not null,
--teacherid int)

--create table registration(
--registrationid int primary key,
--studentid int not null,
--courseid int not null,
--semester varchar(20) not null,
--registrationdate date not null)

--create table attendance(
--attendanceid int primary key,
--studentid int not null,
--courseid int not null,
--attenddate date not null,
--attendstatus varchar(20) check(attendstatus in('present','absent','late')))

--create table marks(
--marksid int primary key,
--studentid int not null,
--courseid int not null,
--assignmentmarks float default 0,
--exammarks float default 0,
--totalmarks float default 0)

--create table transcript(
--transcriptid int primary key,
--studentid int not null,
--semester int not null,
--totalgpa float ,
--generateddate date)

--create table feechallan(
--challanid int primary key,
--studentid int not null,
--coursefees float not null,
--totalamount float not null,
--duedate date not null,
--payment date,
--challanstatus varchar(20) check(challanstatus in('due','paid','overdue')))

--create table courtbooking(
--bookingid int primary key,
--studentid int not null,
--sport varchar(50),
--bookingdate date not null,
--starttime time not null,
--endtime time not null)

--create table complaint(
--complaintid int primary key,
--studentid int not null,
--description1 varchar(500) not null,
--datesubmitted date not null)

--create table announcement (
--announcementid int primary key,
--postedbyid int not null,
--title varchar(50) not null,
--text1 varchar(1000),
--dateposted date not null)

--create table achievement(
--achievementid int primary key,
--studentid int not null,
--title1 varchar(100) not null,
--desc1 varchar(500),
--semester int,
--gpa float,
--dateawarded date)

--alter table student add constraint fk_student foreign key(userid) references users(userid) on update cascade on delete no action

--alter table teacher add constraint fk_teacher foreign key(userid) references users(userid) on update cascade on delete no action

--alter table admin1 add constraint fk_admin foreign key (userid) references users(userid) on update cascade on delete no action

--alter table course add constraint fk_course foreign key (teacherid) references teacher(teacherid) on update cascade on delete no action

--alter table registration add constraint fk_registration foreign key(studentid) references student(studentid) on update cascade on delete no action

--alter table registration add constraint fk_registration2 foreign key(courseid) references course(courseid) on update no action on delete no action

--alter table attendance add constraint fk_attendance1 foreign key (studentid) references student(studentid) on update cascade on delete no action

--alter table attendance add constraint fk_attendance2 foreign key (courseid) references course(courseid) on update no action on delete no action

--alter table marks add constraint fk_mark foreign key (studentid) references student(studentid) on update cascade on delete no action

--alter table marks add constraint fk_mark2 foreign key (courseid) references course(courseid) on update no action on delete no action

--alter table transcript add constraint fk_transcipt foreign key (studentid) references student(studentid) on update cascade on delete no action

--alter table feechallan add constraint fk_feechallan foreign key (studentid) references student(studentid) on update cascade on delete no action

--alter table courtbooking add constraint fk_courtbooking foreign key (studentid) references student(studentid) on update cascade on delete no action

--alter table complaint add constraint fk_complaint foreign key (studentid) references student(studentid) on update cascade on delete no action

--alter table announcement add constraint fk_announcement foreign key (postedbyid) references users(userid) on update cascade on delete no action

--alter table achievement add constraint fk_achievement foreign key (studentid) references student(studentid) on update cascade on delete no action


