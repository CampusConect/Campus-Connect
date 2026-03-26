
--create table users(
--userid int primary key identity(1,1),
--name varchar(100) not null,
--email varchar(100)  unique not null,
--password varchar(200) not null,
--role1 varchar(20) check(role1 in('student','teacher','admin')) not null
--)

--create table student(
--studentid int primary key identity(1,1),
--userid int not null unique,
--rollnum varchar(20) not null unique,
--semester int check (semester>0 and semester<10), --till 9 allowed for repeats
--program varchar(100))

--create table teacher(
--teacherid int primary key identity(1,1),
--userid int not null unique,
--department varchar(100)
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

--create procedure sp_signupstudent
--@name varchar(100),
--@email varchar(100),
--@password varchar(100),
--@rollnum varchar(20),
--@program varchar(100),
--@semester int
--as begin
--if exists(select * from users where email=@email)
--begin 

--print 'email already exists '
--return
--end
--if exists(select * from student where rollnum=@rollnum)
--begin
--print 'rollnumber already exists'
--return
--end
--insert into users([name],email,[password],role1) values(@name,@email,@password,'student')
--declare @userid int=scope_identity()
--insert into student(userid,rollnum,program,semester) values(@userid,@rollnum,@program,@semester)
--print 'account for student created successfully'
--end

--create procedure sp_loginstudent
--@email varchar(100),
--@password varchar(200)
--as
--begin
--if exists(select * from users where email=@email and [password]=@password and role1='student')
--print 'login successful'
--else
--print 'invalid email or password'
--end

--create procedure sp_signupteacher
--@name varchar(100),
--@email varchar(100),
--@password varchar(200),
--@department varchar(100)
--as begin
--if exists (select * from users where email=@email)
--begin
--print 'email already exists'
--return
--end
--insert into users([name],email,[password],role1) values(@name,@email,@password,'teacher')
--declare @userid int =scope_identity()
--insert into teacher(userid,department)values(@userid,@department)
--print 'teacher account created successfully'
--end

--create procedure sp_loginteacher
--@email varchar(100),
--@password varchar(200)
--as begin
--if exists(select * from users where email=@email and [password]=@password and role1='teacher')
--print'login successful'
--else
--print'invlaid email or password'
--end

--create procedure sp_viewattendance
--@studentid int,
--@courseid int
--as begin
--if not exists(select * from student where studentid=@studentid)
--begin
--print 'student not found'
--return
--end
--select a.attenddate,a.attendstatus,c.coursename
--from attendance a join course c on a.courseid=c.courseid
--where a.studentid=@studentid and a.courseid=@courseid
--end

--create procedure sp_updateattendance
--@studentid int,
--@courseid int,
--@attenddate date,
--@attendstatus varchar(20)
--as begin
--if not exists (select * from registration where studentid=@studentid and courseid=@courseid)
--begin
--print 'student not registered in this course'
--return
--end
--if exists(select * from attendance where studentid=@studentid and courseid=@courseid and attenddate=@attenddate)
--update attendance set attendstatus=@attendstatus
--where studentid=@studentid and courseid=@courseid and attenddate=@attenddate
--else
--insert into attendance(studentid,courseid,attenddate,attendstatus) values(@studentid,@courseid,@attenddate,@attendstatus)
--print'attenddance updated successfully'
--end

--create procedure sp_viewmarks
--@studentid int,
--@courseid int
--as begin
--if not exists(select * from student where studentid=@studentid)
--begin
--print 'student not found'
--return
--end
--select m.assignmentmarks,m.exammarks,m.totalmarks,c.coursename
--from marks m join course c on m.courseid=c.courseid
--where m.studentid=@studentid and m.courseid=@courseid
--end

--create procedure sp_updatemarks
--@studentid int,
--@courseid int,
--@assignmentmarks float,
--@exammarks float,
--@totalmarks float
--as begin
--if not exists (select * from registration where studentid=@studentid and courseid=@courseid)
--begin
--print 'student not registered in course'
--return end
--if exists(select * from marks where studentid=@studentid and courseid=@courseid )
--update marks set assignmentmarks=@assignmentmarks,exammarks=@exammarks,totalmarks=@totalmarks
--where studentid=@studentid and courseid=@courseid
--else
--insert into marks(studentid,courseid,assignmentmarks,exammarks,totalmarks) values(@studentid,@courseid,@assignmentmarks,@exammarks,@totalmarks)
--print 'marks updated successfully'
--end

--create procedure sp_gettranscript
--@studentid int
--as
--begin
--if not exists(select * from transcript where studentid=@studentid)
--begin 
--print 'transcript not generated yet'
--return end
--select t.semester,t.totalgpa,t.generateddate,s.rollnum,u.[name]
--from transcript t join student s on s.studentid=t.studentid join users u on s.userid=u.userid
--where t.studentid=@studentid
--end

--create procedure sp_generatetranscript
--@studentid int,
--@semester int,
--@totalgpa float
--as begin
--if not exists (select * from student where studentid=@studentid)
--begin
--print 'student not found'
--return end
--if exists(select * from transcript where studentid=@studentid and semester=@semester)
--begin
--print 'trascript already generated for this semester'
--return
--end
--insert into transcript(studentid,semester,totalgpa,generateddate) values (@studentid,@semester,@totalgpa,getdate())
--print 'transcript generated successfully'
--end

--create procedure sp_generatefeechallan
--@studentid int,
--@duedate date
--as begin
--if not exists(select * from student where studentid=@studentid)
--begin
--print 'student not found'
--return
--end
--declare @totalamount float
--select @totalamount = sum(c.credithours * 5000)
--from registration r join course c on r.courseid=c.courseid
--where r.studentid=@studentid
--if @totalamount is null
--begin
--print 'no courses registered for this student'
--return
--end
--insert into feechallan(studentid,coursefees,totalamount,duedate,payment,challanstatus) values (@studentid,@totalamount,@totalamount,@duedate,null,'due')
--print'fee challan generated successfully'
--end

--create procedure sp_payfeechallan
--@challanid int,
--@studentid int
--as begin
--if not exists (select * from feechallan where challanid=@challanid and studentid=@studentid)
--begin
--print 'challan not found'
--return end
--if exists(select * from feechallan where challanid=@challanid and challanstatus='paid')
--begin
--print 'challan already paid'
--return end
--update feechallan set payment=getdate(),challanstatus='paid'
--where challanid=@challanid and studentid=@studentid
--print 'fee paid successfully'
--end

--create procedure sp_courtbooking
--@studentid int,
--@sport varchar(50),
--@bookingdate date,
--@starttime time,
--@endtime time
--as begin
--if exists (select * from courtbooking where sport=@sport and bookingdate=@bookingdate and starttime=@starttime)
--begin
--print 'solt is already booked'
--return end
--insert into courtbooking(studentid,sport,bookingdate,starttime,endtime) values (@studentid,@sport,@bookingdate,@starttime,@endtime)
--print 'court booked successfully'
--end

--create procedure sp_registercourse
--    @studentid int,
--    @courseid int,
--    @semester varchar(20)
--as
--begin
--    if exists (select 1 from feechallan where studentid=@studentid and challanstatus='due')
--    begin
--        print 'Fee not cleared, cannot register'
--        return
--    end
--    if exists (select 1 from registration where studentid=@studentid and courseid=@courseid and semester=@semester)
--    begin
--        print 'Already registered in this course'
--        return
--    end
--    insert into registration(studentid,courseid,semester,registrationdate)
--    values(@studentid,@courseid,@semester,getdate())
--    print 'Course registered successfully'
--end

--create procedure sp_submitcomplaint
--@studentid int,
--@description1 varchar(500)
--as begin
--if not exists (select * from student where studentid=@studentid)
--begin
--print 'student not found'
--return end
--insert into complaint(studentid,description1,datesubmitted) values(@studentid,@description1,getdate())
--print 'complaint submitted successfully'
--end

--create procedure sp_updatepersonalinfo
--@userid int,
--@name varchar(100),
--@email varchar(100),
--@password varchar(200)
--as begin
--if not exists (select * from users where userid=@userid)
--begin
--print 'user not found'
--return end
--if exists (select * from users where email=@email and userid!=@userid)
--begin
--print 'email already taken'
--return end
--update users set [name]=@name, email=@email, [password]=@password where userid=@userid
--print 'personal info updated successfully'
--end

--create procedure sp_addannouncement
--@postedbyid int,
--@title varchar(50),
--@text1 varchar(1000)
--as begin
--if not exists (select * from users where userid=@postedbyid and role1 in('teacher','admin'))
--begin
--print 'unauthorized, only teachers and admins can post'
--return end
--insert into announcement(postedbyid,title,text1,dateposted) values(@postedbyid,@title,@text1,getdate())
--print 'announcement posted successfully'
--end

--create procedure sp_managehonorlist
--@studentid int,
--@title1 varchar(100),
--@desc1 varchar(500),
--@semester int,
--@gpa float
--as begin
--if not exists (select * from student where studentid=@studentid)
--begin
--print 'student not found'
--return end
--insert into achievement(studentid,title1,desc1,semester,gpa,dateawarded) values(@studentid,@title1,@desc1,@semester,@gpa,getdate())
--print 'achievement added successfully'
--end

--create procedure sp_loginadmin
--@email varchar(100),
--@password varchar(200)
--as begin
--if exists (select * from users where email=@email and [password]=@password and role1='admin')
--print 'login successful'
--else
--print 'invalid email or password'
--end

--triggers start here-------------------------------


--trigger 1: auto mark fee challan as overdue
--fires on insert or update of feechallan
--if duedate has passed and status is still 'due', set it to 'overdue'
 
--create trigger tr_autooverduechallan
--on feechallan
--after insert, update
--as begin
--update feechallan
--set challanstatus = 'overdue'
--where challanid in (select challanid from inserted)
--and duedate < cast(getdate() as date)
--and challanstatus = 'due'
--end

--trigger 2: prevent double court booking with overlapping times
--fires on insert into courtbooking
--checks if any existing booking overlaps on same sport and date
 
--create trigger tr_preventdoublebooking
--on courtbooking
--instead of insert
--as begin
--if exists (
--select 1 from courtbooking cb
--join inserted i on cb.sport = i.sport and cb.bookingdate = i.bookingdate
--where cb.starttime < i.endtime and cb.endtime > i.starttime
--)
--begin
--print 'slot is already booked for this time'
--return
--end
--insert into courtbooking(studentid, sport, bookingdate, starttime, endtime)
--select studentid, sport, bookingdate, starttime, endtime from inserted
--print 'court booked successfully'
--end
 
 
--trigger 3: auto calculate totalmarks from assignmentmarks + exammarks
--fires on insert or update of marks
--keeps totalmarks always consistent
 
--create trigger tr_calctotalmarks
--on marks
--after insert, update
--as begin
--update marks
--set totalmarks = assignmentmarks + exammarks
--where marksid in (select marksid from inserted)
--end
 
 
--trigger 4: cascade delete user related records
--fires on delete from users
--removes related rows from student, teacher, admin1
 
--create trigger tr_cascadedeleteuser
--on users
--after delete
--as begin
--delete from student where userid in (select userid from deleted)
--delete from teacher where userid in (select userid from deleted)
--delete from admin1 where userid in (select userid from deleted)
--print 'related records deleted successfully'
--end
 
 
--trigger 5: block course registration if student has overdue fee
--fires on insert into registration
--cancels insert if student has any overdue challan
 
--create trigger tr_blockregistrationoverdue
--on registration
--instead of insert
--as begin
--if exists (
--select 1 from feechallan fc
--join inserted i on fc.studentid = i.studentid
--where fc.challanstatus = 'overdue'
--)
--begin
--print 'cannot register, student has overdue fee challan'
--return
--end
--insert into registration(studentid, courseid, semester, registrationdate)
--select studentid, courseid, semester, registrationdate from inserted
--print 'course registered successfully'
--end

--trigger 6: prevent marks entry for unregistered student
--fires on insert into marks
--blocks insert if student is not registered in that course

--create trigger tr_blockmarksunregistered
--on marks
--instead of insert
--as begin
--if not exists (
--select 1 from registration r
--join inserted i on r.studentid = i.studentid and r.courseid = i.courseid
--)
--begin
--print 'student is not registered in this course, marks cannot be added'
--return
--end
--insert into marks(studentid, courseid, assignmentmarks, exammarks, totalmarks)
--select studentid, courseid, assignmentmarks, exammarks, assignmentmarks + exammarks from inserted
--print 'marks added successfully'
--end


--trigger 7: auto set registration date to today on insert
--fires on insert into registration
--forces registrationdate to getdate() even if a different date is passed

--create trigger tr_autoregistrationdate
--on registration
--after insert
--as begin
--update registration
--set registrationdate = cast(getdate() as date)
--where registrationid in (select registrationid from inserted)
--end


--trigger 8: log complaint submission date automatically
--fires on insert into complaint
--forces datesubmitted to today regardless of what is passed

--create trigger tr_autocomplaintdate
--on complaint
--after insert
--as begin
--update complaint
--set datesubmitted = cast(getdate() as date)
--where complaintid in (select complaintid from inserted)
--end


--trigger 9: prevent gpa from going above 4.0 in transcript
--fires on insert or update of transcript
--rolls back if totalgpa is out of valid range

--create trigger tr_validategpa
--on transcript
--after insert, update
--as begin
--if exists (
--select 1 from inserted
--where totalgpa > 4.0 or totalgpa < 0.0
--)
--begin
--print 'invalid gpa value, must be between 0.0 and 4.0'
--rollback transaction
--return
--end
--end


--trigger 10: prevent achievement gpa from going above 4.0
--fires on insert or update of achievement
--rolls back if gpa is out of valid range

--create trigger tr_validateachievementgpa
--on achievement
--after insert, update
--as begin
--if exists (
--select 1 from inserted
--where gpa > 4.0 or gpa < 0.0
--)
--begin
--print 'invalid gpa in achievement, must be between 0.0 and 4.0'
--rollback transaction
--return
--end
--end


--trigger 11: auto set announcement date to today on insert
--fires on insert into announcement
--forces dateposted to getdate()

--create trigger tr_autoannouncementdate
--on announcement
--after insert
--as begin
--update announcement
--set dateposted = cast(getdate() as date)
--where announcementid in (select announcementid from inserted)
--end


--trigger 12: prevent duplicate attendance for same student same course same date
--fires on insert into attendance
--blocks insert if record already exists for that date

--create trigger tr_preventduplicateattendance
--on attendance
--instead of insert
--as begin
--if exists (
--select 1 from attendance a
--join inserted i on a.studentid = i.studentid
--and a.courseid = i.courseid
--and a.attenddate = i.attenddate
--)
--begin
--print 'attendance already marked for this student on this date'
--return
--end
--insert into attendance(studentid, courseid, attenddate, attendstatus)
--select studentid, courseid, attenddate, attendstatus from inserted
--print 'attendance marked successfully'
--end


--trigger 13: prevent deleting a course that has registered students
--fires on delete from course
--blocks delete if any student is registered in that course

--create trigger tr_preventcoursedelete
--on course
--instead of delete
--as begin
--if exists (
--select 1 from registration r
--join deleted d on r.courseid = d.courseid
--)
--begin
--print 'cannot delete course, students are registered in it'
--return
--end
--delete from course where courseid in (select courseid from deleted)
--print 'course deleted successfully'
--end


--trigger 14: auto update challan status to paid when payment date is set
--fires on update of feechallan
--if payment date is filled in and status is not paid, mark it as paid

--create trigger tr_autopaidstatus
--on feechallan
--after update
--as begin
--update feechallan
--set challanstatus = 'paid'
--where challanid in (select challanid from inserted)
--and payment is not null
--and challanstatus != 'paid'
--end
--triggers end here--------------------------------------------------


--views start here --------------------------------------------------


--view 1: student courses
--shows each student's enrolled courses with teacher name
 
--create view vw_studentcourses as
--select
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--s.program,
--s.semester,
--c.coursecode,
--c.coursename,
--c.credithours,
--u2.[name] as teachername,
--r.semester as enrolledsemester,
--r.registrationdate
--from registration r
--join student s on r.studentid = s.studentid
--join users u on s.userid = u.userid
--join course c on r.courseid = c.courseid
--join teacher t on c.teacherid = t.teacherid
--join users u2 on t.userid = u2.userid
 
 
--view 2: attendance summary
--shows total present, absent, late counts and attendance percentage per student per course
 
--create view vw_attendancesummary as
--select
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--c.coursecode,
--c.coursename,
--count(case when a.attendstatus = 'present' then 1 end) as totalspresent,
--count(case when a.attendstatus = 'absent' then 1 end) as totalsabsent,
--count(case when a.attendstatus = 'late' then 1 end) as totalslate,
--count(*) as totalclasses,
--cast(
--count(case when a.attendstatus = 'present' then 1 end) * 100.0 / nullif(count(*), 0)
--as decimal(5,2)) as attendancepercentage
--from attendance a
--join student s on a.studentid = s.studentid
--join users u on s.userid = u.userid
--join course c on a.courseid = c.courseid
--group by s.studentid, u.[name], s.rollnum, c.coursecode, c.coursename
 
 
--view 3: student marks
--shows assignment, exam and total marks per student per course
 
--create view vw_studentmarks as
--select
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--c.coursecode,
--c.coursename,
--m.assignmentmarks,
--m.exammarks,
--m.totalmarks
--from marks m
--join student s on m.studentid = s.studentid
--join users u on s.userid = u.userid
--join course c on m.courseid = c.courseid
 
 
--view 4: fee status
--shows each student's fee challan details with name and roll number
 
--create view vw_feestatus as
--select
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--s.program,
--fc.challanid,
--fc.coursefees,
--fc.totalamount,
--fc.duedate,
--fc.payment,
--fc.challanstatus
--from feechallan fc
--join student s on fc.studentid = s.studentid
--join users u on s.userid = u.userid
 
 
--view 5: honor list
--shows students with gpa >= 3.5 from achievement table
 
--create view vw_honorlist as
--select
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--s.program,
--ac.title1,
--ac.desc1,
--ac.semester,
--ac.gpa,
--ac.dateawarded
--from achievement ac
--join student s on ac.studentid = s.studentid
--join users u on s.userid = u.userid
--where ac.gpa >= 3.5

--view 6: announcements with poster info
--shows announcements with poster name and role instead of just postedbyid

--create view vw_announcements as
--select
--a.announcementid,
--a.title,
--a.text1,
--a.dateposted,
--u.[name] as postedby,
--u.role1 as posterrole
--from announcement a
--join users u on a.postedbyid = u.userid

--view 7: transcript summary
--shows full academic history per student with name and roll number

--create view vw_transcriptsummary as
--select
--t.transcriptid,
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--s.program,
--t.semester,
--t.totalgpa,
--t.generateddate
--from transcript t
--join student s on t.studentid = s.studentid
--join users u on s.userid = u.userid


--view 8: student complaint history
--shows all complaints submitted by each student with their name and roll number

--create view vw_complainthistory as
--select
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--c.complaintid,
--c.description1,
--c.datesubmitted
--from complaint c
--join student s on c.studentid = s.studentid
--join users u on s.userid = u.userid


--view 9: court booking schedule
--shows all court bookings with student name, roll number and time details

--create view vw_courtschedule as
--select
--cb.bookingid,
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--cb.sport,
--cb.bookingdate,
--cb.starttime,
--cb.endtime
--from courtbooking cb
--join student s on cb.studentid = s.studentid
--join users u on s.userid = u.userid


--view 10: overdue fee challans
--shows only students who have overdue fee challans

--create view vw_overduefeestudents as
--select
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--s.program,
--fc.challanid,
--fc.totalamount,
--fc.duedate,
--fc.challanstatus
--from feechallan fc
--join student s on fc.studentid = s.studentid
--join users u on s.userid = u.userid
--where fc.challanstatus = 'overdue'


--view 11: teacher course list
--shows each teacher and the courses they are assigned to

--create view vw_teachercourses as
--select
--t.teacherid,
--u.[name] as teachername,
--t.department,
--c.courseid,
--c.coursecode,
--c.coursename,
--c.credithours
--from teacher t
--join users u on t.userid = u.userid
--join course c on c.teacherid = t.teacherid


--view 12: student full profile
--shows complete student info combining users and student table

--create view vw_studentprofile as
--select
--s.studentid,
--u.userid,
--u.[name] as studentname,
--u.email,
--s.rollnum,
--s.program,
--s.semester
--from student s
--join users u on s.userid = u.userid


--view 13: marks with grade
--shows marks and a calculated grade label based on totalmarks out of 100

--create view vw_markswithgrade as
--select
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--c.coursecode,
--c.coursename,
--m.assignmentmarks,
--m.exammarks,
--m.totalmarks,
--case
--when m.totalmarks >= 85 then 'A'
--when m.totalmarks >= 75 then 'B'
--when m.totalmarks >= 65 then 'C'
--when m.totalmarks >= 50 then 'D'
--else 'F'
--end as grade
--from marks m
--join student s on m.studentid = s.studentid
--join users u on s.userid = u.userid
--join course c on m.courseid = c.courseid


--view 14: students at risk of attendance shortage
--shows students whose attendance percentage is below 75 percent

--create view vw_attendancerisk as
--select
--s.studentid,
--u.[name] as studentname,
--s.rollnum,
--c.coursecode,
--c.coursename,
--count(case when a.attendstatus = 'present' then 1 end) as totalspresent,
--count(*) as totalclasses,
--cast(
--count(case when a.attendstatus = 'present' then 1 end) * 100.0 / nullif(count(*), 0)
--as decimal(5,2)) as attendancepercentage
--from attendance a
--join student s on a.studentid = s.studentid
--join users u on s.userid = u.userid
--join course c on a.courseid = c.courseid
--group by s.studentid, u.[name], s.rollnum, c.coursecode, c.coursename
--having
--cast(
--count(case when a.attendstatus = 'present' then 1 end) * 100.0 / nullif(count(*), 0)
--as decimal(5,2)) < 75
--views end here------------------------------------------
