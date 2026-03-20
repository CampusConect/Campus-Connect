--create table users(
--userid int primary key identity(1,1),
--name varchar(100) not null,
--email varchar(100)  unique not null,
--password varchar(200) not null,
--role1 varchar(20) not null check(role1 in('student','teacher','admin')
--))

--create table student(
--studentid int primary key identity(1,1),
--userid int not null unique,
--rollnum varchar(20) not null unique,
--semester int check (semester>0 and semester<10), --till 9 allowed for repeats
--program varchar(100))

--create table teacher(
--teacherid int primary key identity(1,1),
--userid int not null unique,
--department varchar(100),
--)

--create table admin1(
--adminid int primary key identity(1,1),
--userid int not null unique)

--create table course(
--courseid int primary key identity(1,1),
--coursecode varchar(20) not null unique,
--coursename varchar(100) not null,
--credithours int not null,
--teacherid int)

--create table registration(
--registrationid int primary key identity(1,1),
--studentid int not null,
--courseid int not null,
--semester varchar(20) not null,
--registrationdate date not null)

--create table attendance(
--attendanceid int primary key identity(1,1),
--studentid int not null,
--courseid int not null,
--attenddate date not null,
--attendstatus varchar(20) check(attendstatus in('present','absent','late')))

--create table marks(
--marksid int primary key identity(1,1),
--studentid int not null,
--courseid int not null,
--assignmentmarks float default 0,
--exammarks float default 0,
--totalmarks float default 0)

--create table transcript(
--transcriptid int primary key identity(1,1),
--studentid int not null,
--semester int not null,
--totalgpa float ,
--generateddate date)

--create table feechallan(
--challanid int primary key identity(1,1),
--studentid int not null,
--coursefees float not null,
--totalamount float not null,
--duedate date not null,
--payment date,
--challanstatus varchar(20) check(challanstatus in('due','paid','overdue')))

--create table courtbooking(
--bookingid int primary key identity(1,1),
--studentid int not null,
--sport varchar(50),
--bookingdate date not null,
--starttime time not null,
--endtime time not null)

--create table complaint(
--complaintid int primary key identity(1,1),
--studentid int not null,
--description1 varchar(500) not null,
--datesubmitted date not null)

--create table announcement (
--announcementid int primary key identity(1,1),
--postedbyid int not null,
--title varchar(50) not null,
--text1 varchar(1000),
--dateposted date not null)

--create table achievement(
--achievementid int primary key identity(1,1),
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

--time to write sample data for testing


--insert into users([name],email,[password],role1) values ('saad eehab','saadeehab@gmail.com','1234','admin')
--insert into users([name],email,[password],role1) values ('syed mustafa','syedmustafa@gmail.com','1234','student')
--insert into users([name],email,[password],role1) values ('umer raja','umerraja@gmail.com','1234','teacher')
--insert into users([name],email,[password],role1) values ('muhammad izaan','izaan@gmail.com','1234','student')

--insert into student(userid,rollnum,program,semester) values (2,'24l-0956','cs',3)
--insert into student(userid,rollnum,program,semester) values (4,'24l-0819','cs',3)

--insert into teacher(userid,department) values(3,'computer science')

--insert into admin1(userid) values(1)

--insert into course(coursecode,coursename,credithours,teacherid) values('cs301','database systems',3,1)
--insert into course(coursecode,coursename,credithours,teacherid) values('cs302','operating systems',3,1)

--insert into registration(studentid,courseid,semester,registrationdate) values(1,1,'spring 2026','2026-01-10')
--insert into registration(studentid,courseid,semester,registrationdate) values(1,2,'spring 2026','2026-01-10')
--insert into registration(studentid,courseid,semester,registrationdate) values(2,1,'spring 2026','2026-01-11')

--insert into attendance(studentid,courseid,attenddate,attendstatus) values(1,1,'2026-02-01','present')
--insert into attendance(studentid,courseid,attenddate,attendstatus) values(2,1,'2026-02-01','absent')

--insert into marks(studentid,courseid,assignmentmarks,exammarks,totalmarks) values(1,1,18,35,53)
--insert into marks(studentid,courseid,assignmentmarks,exammarks,totalmarks) values(2,1,15,30,45)

--insert into transcript(studentid,semester,totalgpa,generateddate) values(1,3,3.5,'2026-05-01')
--insert into transcript(studentid,semester,totalgpa,generateddate) values(2,3,2.9,'2026-05-01')

--insert into feechallan(studentid,coursefees,totalamount,duedate,payment,challanstatus) values(1,45000,45000,'2026-02-15',null,'due')
--insert into feechallan(studentid,coursefees,totalamount,duedate,payment,challanstatus) values(2,45000,45000,'2026-02-15','2026-02-10','paid')

--insert into courtbooking(studentid,sport,bookingdate,starttime,endtime) values(1,'cricket','2026-03-01','10:00','11:00')

--insert into complaint(studentid,description1,datesubmitted) values(1,'fee challan not generated','2026-02-20')

--insert into announcement(postedbyid,title,text1,dateposted) values(3,'mid exam schedule','mids start from march 10','2026-03-01')
--insert into announcement(postedbyid,title,text1,dateposted) values(1,'fee deadline','pay fee before feb 15','2026-01-20')

--insert into achievement(studentid,title1,desc1,semester,gpa,dateawarded) values(1,'dean list','achieved dean list award',3,3.8,'2026-05-10')

--select * from users
--select * from student
--select * from teacher
--select * from admin1
--select * from course
--select * from registration
--select * from attendance
--select * from marks
--select * from transcript
--select * from feechallan
--select * from courtbooking
--select * from complaint
--select * from announcement
--select * from achievement