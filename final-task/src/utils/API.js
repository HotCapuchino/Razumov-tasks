import axios from 'axios';

export class API {

    constructor() {
        this.request = axios.create({
            baseURL: 'http://localhost:8000',
            responseType: 'json'
        });
    }

    async fetchToDos() {
        let response = await this.request.get('/tasks');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unable to fetch data!');
        }
    }

    async createToDo(description, importance) {
        console.log('create ToDo was invoked!');
        let new_toDo = {
            id: Date.now(),
            description: description,
            status: 'pending',
            importance: importance,
            completed: false
        };
        let response = await this.request.post(`/tasks`, new_toDo);
        if (response.status < 300) {
            console.log(response.status);
            return new_toDo;
        } else {
            throw new Error('Unable to post data!');
        }
    }

    async editToDo(toDo_id, options) {
        let {description, status, importance} = options;
        let response = await this.request.patch(`/tasks/${toDo_id}`, {
            description: description,
            status: status,
            importance: importance
        });
        if (response.status !== 200) {
            throw new Error('Unable to update data!');
        } else {
            return true;
        }
    }

    async toggleToDo(toDo_id, value) {
        let response = await this.request.patch(`/tasks/${toDo_id}`, {
            completed: value
        });
        if (response.status !== 200) {
            throw new Error('Unable to update data!');
        } else {
            return true;
        }
    }

    async deleteToDo(toDo_id) {
        Promise.all([
            this.request.delete(`/tasks/${toDo_id}`),
            this.request.delete(`/comments/${toDo_id}`)
        ]).then(() => true)
        .catch(err => {
            console.log(err);
            throw new Error('Error occurred while trying to delete toDo!');
        });
    }

    async fetchContributors(toDo_id) {
        let response = await this.request.get(`/contributors/${toDo_id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unable to fetch data!');
        }
    }

    async addContributor(toDo_id, user_id, role) {
        let response = await this.request.get(`/contributors/${toDo_id}`);
        if (response.status !== 200) {
            throw new Error('Unable to fetch data!');
        }
        let contributors_list = response.data.contributors_list;
        contributors_list.push({user_id: user_id, role: role});
        response = await this.request.patch(`/contributors/${toDo_id}`, {contributors_list: contributors_list});
        if (response.status !== 200) {
            throw new Error('Unable to update data!');
        } else {
            return true;
        }
    }

    async fetchComments(toDo_id) {
        let response = await this.request.get(`/comments/${toDo_id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unable to fetch data!');
        }
    }

    async addComment(toDo_id, user_id, text) {
        let response = await this.request.get(`/comments/${toDo_id}`);
        if (response.status !== 200) {
            throw new Error('Unable to fetch data!');
        }
        let comments = response.data.comments_list;
        comments.push({user_id: user_id, text: text});
        response = await this.request.patch(`/comments/${toDo_id}`, {comments_list: comments});
        if (response.status !== 200) {
            throw new Error('Unable to update data!');
        } else {
            return true;
        }
    }

    async deleteComment(toDo_id, user_id) {
        let response = await this.request.get(`/comments/${toDo_id}`);
        if (response.status !== 200) {
            throw new Error('Unable to fetch data!');
        }
        let new_comments = response.data.comments_list.array.map(comment => {
            if (comment.user_id !== user_id) {
                return comment;
            }
        });
        response = await this.request.patch(`/comments/${toDo_id}`, {comments_list: new_comments});
        if (response.status !== 200) {
            throw new Error('Unable to update data!');
        } else {
            return true;
        }
    }

    async editComment() {

    }

    async fetchUsers() {
        let response = await this.request.get('/users');
        console.log(response.data);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unable to fetch data!');
        }
    }

}


const api = new API();
export {api};