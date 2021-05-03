import axios from 'axios';
import modalDispatcher from './ModalDispatcher';

export class API {

    constructor() {
        this.request = axios.create({
            baseURL: 'http://localhost:8000',
            responseType: 'json'
        });
        this.request.interceptors.response.use(
            function successfulResponse(res) {
                return res.data;
            }, 
            function interceptBadResponses (err) {
                let possibleTroubleRoutes = ['comments', 'notifications', 'contributors'];
                switch(err.response.status) {
                    case '201': {
                        console.log('Resource was created!');
                        return err.data;
                    }
                    case '304': {
                        console.log('There\'s no need to refresh data, as nothing was changed, since moment data was cached!');
                        return err.data;
                    }
                    case '404': {
                        for (const troubleRoute of possibleTroubleRoutes) {
                            if (err.response.config.url.includes(troubleRoute)) {
                                throw new Error(`Unable to fetch ${troubleRoute}`);
                            }
                        }
                        throw new Error('Unable to fetch data!');
                    }
                    case '500': {
                        modalDispatcher('Seems like an error occured somewhere on the server!');
                        throw new Error('Server issue!');
                    }
                }
            }
        );
    }

    // toDos actions
    async fetchToDos() {
        return await this.request.get('/tasks');
    }

    async createToDo(description, importance) {
        let new_toDo = {
            id: Date.now(),
            description: description,
            status: 'pending',
            importance: importance,
            completed: false
        };
        await this.request.post(`/tasks`, new_toDo);
        return new_toDo;
    }

    async editToDo(toDo_id, options) {
        let {description, status, importance} = options;
        await this.request.patch(`/tasks/${toDo_id}`, {
            description: description,
            status: status,
            importance: importance
        });
        return true;
    }

    async toggleToDo(toDo_id, value) {
        await this.request.patch(`/tasks/${toDo_id}`, {
            completed: value
        });
        return true;
    }

    async deleteToDo(toDo_id) {
        Promise.allSettled([
            this.request.delete(`/tasks/${toDo_id}`),
            this.request.delete(`/contributors/${toDo_id}`),
            this.request.delete(`/comments/${toDo_id}`)
        ]).then(() => true)
        .catch(err => {
            console.log(err);
        });
    }

    // contributors actions
    async fetchContributors(toDo_id) {
        return await this.request.get(`/contributors/${toDo_id}`);
    }

    async addContributor(toDo_id, user_id, role) {
        try {
            let response = await this.request.get(`/contributors/${toDo_id}`);
            let contributors_list = response.contributors_list;
            for (const contributor of contributors_list) {
                if (contributor.user_id === user_id) return true;
            }
            contributors_list.push({user_id: user_id, role: role});
            await this.request.patch(`/contributors/${toDo_id}`, {contributors_list: contributors_list});
            return true;
        } catch(err) {
            let contributors_list = [];
            contributors_list.push({user_id: user_id, role: role});
            await this.request.post('/contributors', {
                id: toDo_id,
                contributors_list: contributors_list
            });
            return true;
        }
    }

    // comments Actions
    async fetchComments(toDo_id) {
        return await this.request.get(`/comments/${toDo_id}`);
    }

    async addComment(toDo_id, user_id, text) {
        let new_comment = {
            user_id,
            time: Date.now(),
            text,
        };
        try {
            let data = await this.request.get(`/comments/${toDo_id}`);
            let comments = data.comments_list;
            comments.push(new_comment);
            await this.request.patch(`/comments/${toDo_id}`, {comments_list: comments});
            return new_comment;
        } catch(err) {
            let comments = [];
            comments.push(new_comment);
            await this.request.post(`/comments`, {
                id: toDo_id,
                comments_list: comments
            });
            return new_comment;
        }
    }

    // users Actions
    async fetchUsers() {
        return await this.request.get('/users');
    }

    async fetchNotifications(user_id) {
        return await this.request.get(`/notifications/${user_id}`);
    }

    async addNotification(user_id, text) {
        let new_notification = {text};
        try {
            let response = await this.request.get(`/notifications/${user_id}`);
            let notifications_list = response.notifications_list;
            notifications_list.push(new_notification);
            await this.request.patch(`/notifications/${user_id}`, {notifications_list: notifications_list});
            return true;
        } catch(err) {
            let notifications = [];
            notifications.push(new_notification);
            await this.request.post('/notifications', {
                id: user_id,
                notifications_list: notifications
            });
            return true;
        }    
    }

    async deleteNotifications(user_id) {
        await this.request.delete(`/notifications/${user_id}`);
        return true;
    }

}

const api = new API();
export {api};