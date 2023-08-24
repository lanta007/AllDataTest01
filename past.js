import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import express  from 'express';
import bodyParser  from "body-parser";
import cors from 'cors';

var app3 = express()
app3.use(cors());
app3.use(bodyParser.json());
app3.use(bodyParser.urlencoded({extended: true}))
var datapost = app3.listen(3001, console.log('server is running on port 3001'))

const firebaseConfig = {
    databaseURL: "https://alldatatest01-default-rtdb.firebaseio.com/"
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const propertyNames = Object.keys(app3.post);
const propertyValues = Object.values(app3.post);
const entries = Object.entries(app3.post);


//create datapost
app3.post('/api/CreateDataPost', (req, res) => { 
    var postId = req.body.postId;
    var thumbUrl = req.body.thumbUrl;
    var title = req.body.title;
    var UserId = req.body.UserId;
    var date = req.body.date;
    var content = req.body.content;
    var list1 = req.body.list1;
    var list2 = req.body.list2;
    var list3 = req.body.list3;
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var img3 = req.body.img3;
    var like = req.body.like;
    var tag = req.body.tag;

    try {
        console.log('UserId', UserId);
        console.log('content', content);
        console.log('date', date);
        console.log('img1', img1);
        console.log('img2', img2);
        console.log('img3', img3);
        console.log('list1', list1);
        console.log('list2', list2);
        console.log('list3', list3);
        console.log('postId', postId);
        console.log('thumbUrl', thumbUrl);
        console.log('title', title);
        console.log('like', like);
        console.log('tag', tag);

        console.log('path','datapost/'+ UserId+content+date+
        img1+img2+img3+list1+list2+list3+postId+thumbUrl+title+like+tag)
        const post = (UserId+"postId"+postId );
        set(ref(db,'datapost/'+post),
            {
               "UserId":UserId,
               "content":content,
               "date":new Date()+'',
               "img1": img1,
               "img2": img2,
              "img3": img3,
              "list1": list1,
              "list2": list2,
              "list3": list3,
              "postID": postId, 
              "thumbURL": thumbUrl, 
              "title": title, 
              "like": like,
              "tag": tag
        }
        );
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Post created successfully.'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
});


app3.get('/api/getdataPost', (req, res) => {
    try {
        get(ref(db,'datapost'))
        .then((snapshot) => {
            let a = [];
            snapshot.forEach(snap => {
                a.push(snap.val());
            })
            console.log(snapshot.val())
            //console.log(propertyNames);
            //console.log(propertyValues);
            //console.log(entries);

            if( snapshot.exists() ) {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: a
                })
            }
            else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch((err2) => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//update
app3.put('/api/UpdateDatapost', (req, res) => {
    var postID = req.body.postId;
    var thumbURL = req.body.thumbUrl;
    var title = req.body.title;
    var UserID = req.body.UserId;
    var date = req.body.date;
    var content = req.body.content;
    var list1 = req.body.list1;
    var list2 = req.body.list2;
    var list3 = req.body.list3;
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var img3 = req.body.img3;
    var like = req.body.like;
    var tag = req.body.tag;

    try {
        var updates = {};
        updates[`posts/${postId}/UserId`] = UserId;
        updates[`posts/${postId}/content`] = content;
        updates[`posts/${postId}/date`] = date;
        updates[`posts/${postId}/img1`] = img1;
        updates[`posts/${postId}/img2`] = img2;
        updates[`posts/${postId}/img3`] = img3;
        updates[`posts/${postId}/list1`] = list1;
        updates[`posts/${postId}/list2`] = list2;
        updates[`posts/${postId}/list3`] = list3;
        updates[`posts/${postId}/thumbUrl`] = thumbUrl;
        updates[`posts/${postId}/title`] = title;
        updates[`posts/${postId}/like`] = like;
        updates[`posts/${postId}/tag`] = tag;


        update(ref(db), updates)
        .then(() => {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good'
            });
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'bad ' + err2.message
            });
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
});


//delete
app3.delete('/api/DeleteDataPost', (req, res) => {
    var postID = req.body.postId;
    var thumbURL = req.body.thumbUrl;
    var title = req.body.title;
    var UserID = req.body.UserId;
    var date = req.body.date;
    var content = req.body.content;
    var list1 = req.body.list1;
    var list2 = req.body.list2;
    var list3 = req.body.list3;
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var img3 = req.body.img3;
    var like = req.body.like;
    var tag = req.body.tag;

    try {
        var updates = {};
        updates[`posts/${postId}/UserId`] = UserId;
        updates[`posts/${postId}/content`] = content;
        updates[`posts/${postId}/date`] = date;
        updates[`posts/${postId}/img1`] = img1;
        updates[`posts/${postId}/img2`] = img2;
        updates[`posts/${postId}/img3`] = img3;
        updates[`posts/${postId}/list1`] = list1;
        updates[`posts/${postId}/list2`] = list2;
        updates[`posts/${postId}/list3`] = list3;
        updates[`posts/${postId}/thumbUrl`] = thumbUrl;
        updates[`posts/${postId}/title`] = title;
        updates[`posts/${postId}/like`] = like;
        updates[`posts/${postId}/tag`] = tag;

        remove(ref(db, `datapost/${UserId}`))
        .then(() => {
            update(ref(db), updates)
            .then(() => {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good'
                });
            })
            .catch((err2) => {
                return res.status(500).json({
                    RespCode: 500,
                    RespMessage: 'bad ' + err2.message
                });
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            });
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
});

   //create datauser
app3.post('/api/CreateDataUser', (req, res) => { 
    var UserId = req.body.UserId;
    var imgUser = req.body.imgUser;
    var userName = req.body.userName;
    var Followers = req.body.Followers;
    var Following = req.body.Following;

    try {

        console.log('UserId', UserId);
        console.log('imgUser', imgUser);
        console.log('userName', userName);
        console.log('Followers', Followers);
        console.log('Following', Following);

        console.log('path','datauser/'+ UserId+imgUser+userName+
        Followers+Following)
        const users = (UserId + "UserId" + userName );
        set(ref(db,'datauser/'+users),
            {
               "UserId": UserId,
               "imgUser": imgUser,
               "userName": userName,
               "Followers": Followers,
               "Following": Following,
        }
        );
        return res.status(200).json({
            RespCode: 200,
            RespMessage: ' Data User created successfully.'
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }

}); 
app3.get('/api/GetDataUser', (req, res) => {
    try {
        get(ref(db,'datauser'))
        .then((snapshot) => {
            let a = [];
            snapshot.forEach(snap => {
                a.push(snap.val());
            })
            console.log(snapshot.val())
            //console.log(propertyNames);
            //console.log(propertyValues);
            //console.log(entries);

            if( snapshot.exists() ) {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: a
                })
            }
            else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch((err2) => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})
//update datausers
app3.put('/api/UpdateDataUser', (req, res) => {
    var UserId = req.body.UserId;
    var imgUser = req.body.imgUser;
    var userName = req.body.userName;
    var Followers = req.body.Followers;
    var Following = req.body.Following;


    try {
        var updates = {};
        //updates[`users/${postID}/UserId`] = UserId;
        updates[`users/${UserId}/imgUser`] = imgUser;
        updates[`users/${UserId}/userName `] = userName ;
        updates[`users/${UserId}/Followers`] = Followers;
        updates[`users/${UserId}/Following `] = Following ;
        

        update(ref(db), updates)
        .then(() => {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: ' good '
            });
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: ' bad ' + err2.message
            });
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
    
});


//delete datausers
app3.delete('/api/DeleteDataUser', (req, res) => {
    var UserId = req.body.UserId;
    var imgUser = req.body.imgUser;
    var userName = req.body.userName;
    var Followers = req.body.Followers;
    var Following = req.body.Following;


    try {
        var updates = {};
        updates[`users/${UserId}/UserId`] = UserId;
        updates[`users/${UserId}/imgUser`] = imgUser;
        updates[`users/${UserId}/userName `] = userName ;
        updates[`users/${UserId}/Followers`] = Followers;
        updates[`users/${UserId}/Following `] = Following ;

        remove(ref(db, `datausers/${UserId}`))
        .then(() => {
            update(ref(db), updates)
            .then(() => {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: ' good '
                });
            })
            .catch((err2) => {
                return res.status(500).json({
                    RespCode: 500,
                    RespMessage: ' bad ' + err2.message
                });
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            });
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
});


//create comment
app3.post('/api/CreateDataComment', (req, res) => { 
    var commentId = req.body.commentId;
    var UserId = req.body.UserId;
    var date = req.body.date;
    var comment = req.body.comment;

    try {
        console.log('UserId', UserId );
        console.log('commentId', commentId);
        console.log('comment', comment);
        console.log('date', date);

        console.log('path','datacomment/'+ UserId+commentId+comment+
        date)
        const post = (UserId + "commentId" + commentId );
        set(ref(db,'datacomment/'+comment),
            {
               "UserId": UserId,
               "commentId": commentId,
               "comment": comment,
               "date":new Date()+'',
        }
        );
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Comment created successfully.'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
}); 
app3.get('/api/GetDataComment', (req, res) => {
    try {
        get(ref(db,'datacomment'))
        .then((snapshot) => {
            let a = [];
            snapshot.forEach(snap => {
                a.push(snap.val());
            })
            console.log(snapshot.val())
            //console.log(propertyNames);
            //console.log(propertyValues);
            //console.log(entries);

            if( snapshot.exists() ) {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: a
                })
            }
            else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch((err2) => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})
//update datacomment
app3.put('/api/UpdateDataComment', (req, res) => {
    var UserId = req.body.UserId;
    var commentId = req.body.commentId;
    var date = req.body.date;
    var comment = req.body.comment;
    


    try {
        var updates = {};
        updates[`comment/${commentId}/UserId`] = UserId;
        updates[`comment/${commentId}/commentId`] = commentId;
        updates[`comment/${commentId}/date`] = date ;
        updates[`comment/${commentId}/comment`] = comment;
        

        update(ref(db), updates)
        .then(() => {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: ' good '
            });
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: ' bad ' + err2.message
            });
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
    
});

//delete datacomment
app3.delete('/api/DeleteDataComment', (req, res) => {
    var UserId = req.body.UserId;
    var commentId = req.body.commentId;
    var date = req.body.date;
    var comment = req.body.comment;


    try {
        var updates = {};
        updates[`comment/${commentId}/UserId`] = UserId;
        updates[`comment/${commentId}/commentId`] = commentId;
        updates[`comment/${commentId}/date `] = date ;
        updates[`comment/${commentId}/comment`] = comment;
       
        remove(ref(db, `datacomment/${commentId}`))
        .then(() => {
            update(ref(db), updates)
            .then(() => {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: ' good '
                });
            })
            .catch((err2) => {
                return res.status(500).json({
                    RespCode: 500,
                    RespMessage: ' bad ' + err2.message
                });
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            });
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        });
    }
});

//609