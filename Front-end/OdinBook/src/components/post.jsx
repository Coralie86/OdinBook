import { useContext, useState } from 'react'
import style from "../styles/post.module.css"
import handshake from "../assets/handshake.svg"
import pending from "../assets/mark_email_unread.svg"
import sent from "../assets/schedule_send.svg"
import toadd from "../assets/person_add.svg"
import sheriffGrey from "../assets/sheriffGrey.png"
import sheriffYellow from "../assets/sheriffYellow.png"
import Comment from './comment'
import { VscCommentDiscussionQuote } from "react-icons/vsc";
import { BiSolidCommentAdd } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";
import { TiCancel } from "react-icons/ti";
import { AuthContext } from '../services/authContext'
import {likePost, unlikePost, addComment} from "../services/postServices.js"
import {deleteComment} from "../services/commentServices.js"
import DOMPurify from "dompurify";

function Post({post}) {
    const {auth} = useContext(AuthContext);
    const [comments, setComments] = useState(post.comments);
    const [showComment, setShowComment] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);
    const [likedStatus, setLikedStatus] = useState(post.likes.length > 0 ? "liked" : "")

    let status = "toadd";

    if((post.author.followers.length > 0)){
        if(post.author.followers[0].isAccepted){
            status = "accepted";
        } else {
            status = "sent";
        }
    }
    if(post.author.follows.length > 0){
        if(post.author.follows[0].isAccepted){
            status = "accepted";
        } else {
            status = "pending";
        }
    }


    const handleDisplayComment = () => {
        if(showComment){
            setShowComment(false);
        } else {
            setShowComment(true);
        }
    }

    const handleDisplayAddComment = () => {
        if(showAddComment){
            setShowAddComment(false);
        } else {
            setShowAddComment(true);
        }
    }

    const handleLiked = async () => {
        try {
            if(likedStatus == ""){
                await likePost(auth, post.id);
                setLikedStatus("liked");
            } else {
                await unlikePost(auth, post.id);
                setLikedStatus("");
            }
            
        } catch(err) {
            console.log(err)
        }
        
    }

    const handleAddComment = async () => {
        const content = document.getElementById("newComment").value;
        
        try {
            const newComment = await addComment(auth, post.id, content);
            console.log(newComment)
            setComments([
                ...comments, newComment.comment
            ])
            setShowAddComment(false);
            setShowComment(true);
        } catch(err) {
            console.log(err)
        }
        
    }

    const handleCancel = () => {
        setShowAddComment(false);
    }

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(auth, commentId);
            setComments(comments.filter(com => com.id !== commentId));
        } catch(err) {
            console.log(err)
        }
    }

  return(
    <div >
        <div className={style.post} >
            <div className={style.textPost}>
                <h1>{post.title}</h1>
                <div className={style.contentPost} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}></div>
                <p className={style.authorPost} >{post.author.username}
                    <img src={status == "accepted" ? handshake : 
                        status == "pending" ? pending : 
                        status == "sent" ? sent : toadd 
                    } />
                </p>                
                <div className={style.timetampPost} >
                    <div className={style.iconContainer}>
                        <img src={likedStatus == "liked" ? sheriffYellow : sheriffGrey} className={style.icon + " " + style.pngAsSvg} onClick={handleLiked} />
                        <BiSolidCommentAdd onClick={handleDisplayAddComment} className={style.icon} />
                        {post.comments.length > 0 ? (
                            <VscCommentDiscussionQuote className={style.icon} onClick={handleDisplayComment} />
                        ) : <></>}  
                    </div>                  
                    <div className={style.date}>{(new Date(post.timestamp)).toLocaleString()}</div>
                </div>
            </div>      
        </div>
        {showAddComment && 
            <div className={style.addCommentContainer} >
                <textarea  id="newComment" name="newComment" placeholder="Insert a comment" />
                <TiTickOutline onClick={handleAddComment} className={style.icon} />
                <TiCancel onClick={handleCancel} className={style.icon} />
            </div>
        }
        {showComment && 
            <div className={style.commentContainer}>
                {comments.map(comment => {
                    return(
                        <Comment key={comment.id} comment={comment} deleteComment={handleDeleteComment} />
                    )
                })}
            </div>
        }
    </div>
  )
}

export default Post