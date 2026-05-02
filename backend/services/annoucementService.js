const Announcement = require('../repositories/announcement')
class AnnouncementService {
constructor() {
this.announcementRepo = new Announcement()
}
async addAnnouncement(postedbyid, title, text1) {
if (!postedbyid || !title) {
throw new Error('postedbyid and title are required')
}
if (title.length > 50) {
throw new Error('title cannot exceed 50 characters')
}
if (text1 && text1.length > 1000) {
throw new Error('text cannot exceed 1000 characters')
}
// mirror sp_addannouncement: only teachers and admins
const allowed = await this.announcementRepo.isAuthorizedPoster(postedbyid)
if (!allowed) {
throw new Error('unauthorized, only teachers and admins can post')
}
await this.announcementRepo.addAnnouncement(postedbyid, title, text1)
return { message: 'announcement posted successfully' }
}
async getAllAnnouncements() {
return await this.announcementRepo.getAllAnnouncements()
}
async getAnnouncementById(announcementid) {
const announcement = await this.announcementRepo.getAnnouncementById(announcementid)
if (!announcement) {
throw new Error('announcement not found')
}
return announcement
}
async getAnnouncementsByPoster(postedbyid) {
return await this.announcementRepo.getAnnouncementsByPoster(postedbyid)
}

async deleteAnnouncement(announcementid, requesterid) {
const announcement = await this.announcementRepo.getAnnouncementById(announcementid)
if (!announcement) {
throw new Error('announcement not found')
}
// only the original poster can delete
if (requesterid && announcement.postedbyid !== requesterid) {
throw new Error('unauthorized, only the poster can delete this announcement')
}
await this.announcementRepo.deleteAnnouncement(announcementid)
return { message: 'announcement deleted successfully' }
}
}
module.exports = new AnnouncementService()
