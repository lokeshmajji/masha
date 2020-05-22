import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../model/blog.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { BlogComment } from '../model/comment.model';


@Injectable({
    providedIn: 'root'
})
export class DataService implements OnInit{

    blogSubject  = new BehaviorSubject<{key: string, value: Blog}>({key : "TEST ", value : new Blog("","",new Date(),new Date(),[""],"",[]) });
    //blogSubject  = new Subject<{key: string, value: Blog}>();


    constructor(private http : HttpClient, private authService : AuthService){}

    ngOnInit(){

    }

    getUserEmail(){
        return this.authService.user.value.email.replace('.','-').replace('@','-');
    }

    saveBlog(blog: Blog){
        //return this.http.post('https://masha-3f6b0.firebaseio.com/posts.json',blog);  
       
       if(this.getUserEmail()){
           return this.http.post(`https://masha-3f6b0.firebaseio.com/posts/${this.getUserEmail()}.json`, blog)
       } else{
           console.log("retun nothing")
       }
    }
    
    getBlogs(){
        return this.http.get(`https://masha-3f6b0.firebaseio.com/posts/${this.getUserEmail()}.json`);
    }

    updateBlog(key:string, blog: Blog){
        // curl -X PUT -d '{
        //     "alanisawesome": {
        //       "name": "Alan Turing",
        //       "birthday": "June 23, 1912"
        //     }
        //   }' 'https://docs-examples.firebaseio.com/rest/saving-data/fireblog/users.json'

        return this.http.put(`https://masha-3f6b0.firebaseio.com/posts/${this.getUserEmail()}/${key}.json`, blog)
    }

    addComment(key:string, comment: BlogComment){
         return this.http.post(`https://masha-3f6b0.firebaseio.com/comments/${this.getUserEmail()}/${key}.json`, comment)
        
    }

    getComments(key:string){
        //console.log(`https://masha-3f6b0.firebaseio.com/comments/${this.getUserEmail()}}/${key}.json`)
        return this.http.get(`https://masha-3f6b0.firebaseio.com/comments/${this.getUserEmail()}/${key}.json`);
    }
 
    updateComment(postkey:string, commentkey:string, comment: Comment){
        // curl -X PUT -d '{
        //     "alanisawesome": {
        //       "name": "Alan Turing",
        //       "birthday": "June 23, 1912"
        //     }
        //   }' 'https://docs-examples.firebaseio.com/rest/saving-data/fireblog/users.json'

        return this.http.put(`https://masha-3f6b0.firebaseio.com/comments/${this.getUserEmail()}/${postkey}/${commentkey}.json`, comment)
    }


    deletePost(key:string){
        console.log(`https://masha-3f6b0.firebaseio.com/posts/${this.getUserEmail()}/${key}.json`)
        return this.http.delete(`https://masha-3f6b0.firebaseio.com/posts/${this.getUserEmail()}/${key}.json`);
       
   }

   deleteComment(postkey:string, commentkey:string){
    return this.http.delete(`https://masha-3f6b0.firebaseio.com/comments/${this.getUserEmail()}/${postkey}/${commentkey}.json`);
   
}



}