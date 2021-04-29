import axios from 'axios';

export class API {

    constructor() {
        this.request = axios.create({
            baseURL: 'http://localhost:8000',
            responseType: 'json'
        });
    }

    // toDos actions
    async fetchToDos() {
        let response = await this.request.get('/tasks');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unable to fetch data!');
        }
    }

    async createToDo(description, importance) {
        let new_toDo = {
            id: Date.now(),
            description: description,
            status: 'pending',
            importance: importance,
            completed: false
        };
        let response = await this.request.post(`/tasks`, new_toDo);
        if (response.status < 300) {
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
        if (response.status > 300) {
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
            this.request.delete(`/contributors/${toDo_id}`),
            this.request.delete(`/comments/${toDo_id}`)
        ]).then(() => true)
        .catch(err => {
            console.log(err);
            // throw new Error('Error occurred while trying to delete toDo!');
        });
    }

    // contributors actions
    async fetchContributors(toDo_id) {
        let response = await this.request.get(`/contributors/${toDo_id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unable to fetch data!');
        }
    }

    async addContributor(toDo_id, user_id, role) {
        try {
            let response = await this.request.get(`/contributors/${toDo_id}`);
            let contributors_list = response.data.contributors_list;
            contributors_list.push({user_id: user_id, role: role});
            response = await this.request.patch(`/contributors/${toDo_id}`, {contributors_list: contributors_list});
        } catch(err) {
            let contributors_list = [];
            contributors_list.push({user_id: user_id, role: role});
            let response = await this.request.post('/contributors', {
                id: toDo_id,
                contributors_list: contributors_list
            });
            if (response.status > 300) {
                console.log('Unable to post data!');
            } else {
                return true;
            }
        }
    }

    // comments Actions
    async fetchComments(toDo_id) {
        let response = await this.request.get(`/comments/${toDo_id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unable to fetch data!');
        }
    }

    async addComment(toDo_id, user_id, text) {
        let new_comment = {
            user_id,
            time: Date.now(),
            text,
        };
        try {
            let response = await this.request.get(`/comments/${toDo_id}`);
            let comments = response.data.comments_list;
            comments.push(new_comment);
            response = await this.request.patch(`/comments/${toDo_id}`, {comments_list: comments});
        } catch(err) {
            let comments = [];
            comments.push(new_comment);
            let response = await this.request.post(`/comments`, {
                id: toDo_id,
                comments_list: comments
            });
            if (response.status > 300) {
                throw new Error('Unable to update data!');
            }
        }
        return new_comment;
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

    // users Actions
    async fetchUsers() {
        let response = await this.request.get('/users');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Unable to fetch data!');
        }
    }

}


const api = new API();
export {api};