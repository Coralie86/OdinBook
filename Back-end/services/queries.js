const {prisma} = require("../lib/prisma.js")
const bcrypt = require("bcryptjs")


async function createAccount({username, email, password}){
    return prisma.user.create({
        data: {
            username: username,
            email: email,
            password: await bcrypt.hash(password, 10),
            image: "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
        }
    });

} 

async function createPost(content, authorId) {
    return await prisma.post.create({
        data: {
            content: content,
            authorId: authorId,
        }
    })
}

async function getAllPost(userId, options){
    //insert logic with filters
    const likedList = await getPostLikedByUser(userId);
    const followingList = await getFollowedUser(userId);

    const andFilters = [];

    if(options.search){
        andFilters.push({
            content: {
                contains: options.search,
                mode: "insensitive",
            }
        })
    }

    if(options.liked){
        andFilters.push({
            id: {
                in: likedList,
            }
        })
    }

    if(options.following){
        andFilters.push({
            authorId: {
                in: followingList,
            }
        })
    }

    const postList = await prisma.post.findMany({
        where: andFilters.length > 0 ? {AND : andFilters} : {},
        include: {
            comments: {
                select: {
                    id: true,
                    description: true,
                    isEdited: true,
                    timestamp: true,
                    writer: {
                        select: {
                            username: true,
                        }
                    }
                    
                }
            },
            author: {
                select: {
                    username: true,
                    follows: {
                        where: {
                            userFollowedId: userId,
                        },
                        select: {
                            isAccepted: true,
                        }
                    },
                    followers: {
                        where: {
                            userId: userId,
                        },
                        select: {
                            isAccepted: true,
                        }
                    },
                }
            },
            likes: {
                where: {
                    userId: userId,
                },
            }
        }
    });
    return postList
}

async function getPostLikedByUser(userId){
    const postLiked= await prisma.like.findMany({
        where: {
            userId: userId,
        },
        select: {
            postId: true,
        }
    });
    const likedPostlist = postLiked.map(obj => obj["postId"])
    return likedPostlist
}

async function getFollowedUser(userId){
    const followedUsers = await prisma.follow.findMany({
        where: {
            userId: userId,
            isAccepted: true,
        },
        select: {
            userFollowedId: true,
        },        
    })
    
    const followedUserlist = followedUsers.map(obj => obj["userFollowedId"])
    return followedUserlist
}

// Get list of requests sent by other users to follow me
async function getPendingUser(userId){
    const pendingUsers = await prisma.follow.findMany({
        where: {
            userFollowedId: userId,
            isAccepted: false,
        },
        select: {
            userId: true,
        },        
    })
    
    const pendingUserlist = pendingUsers.map(obj => obj["userId"])
    return pendingUserlist
}

// Get list of  my requests sent to other users to follow them
async function getRequestedUser(userId){
    const requestedUsers = await prisma.follow.findMany({
        where: {
            userId: userId,
            isAccepted: false,
        },
        select: {
            userFollowedId: true,
        },        
    })
    
    const requestedUserlist = requestedUsers.map(obj => obj["userFollowedId"])
    return requestedUserlist
}

async function likePost(postId, userId){
    const postLiked = await prisma.like.create({
        data:{
            userId: userId,
            postId: postId,
        }
    })
    return postLiked
}

async function unlikePost(postId, userId){
    await prisma.like.delete({
        where:{
            userId_postId: {
                postId: postId,
                userId: userId,
            }
        }
    })

}

async function deletePost(postId){
    await prisma.comment.deleteMany({
        where: {
            postId: postId, 
        }
    })

    await prisma.like.deleteMany({
        where: {
            postId: postId, 
        }
    })

    await prisma.post.delete({
        where: {
            id: postId, 
        }
    })
}

async function createComment(postId, authorId, content){
    const comment = await prisma.comment.create({
        data: {
            description: content,
            postId: postId,
            writerId: authorId,
        },
        select: {
            id: true,
            description:true,
            isEdited: true,
            timestamp: true,
            writer: {
                select: {
                    username: true,
                }
            }
        }
    })

    return comment
}

async function editComment(content, commentId){
    const commentEdited = await prisma.comment.update({
        where: {
            id : commentId,
        },
        data: {
            description: content,
            isEdited: true,
            timestamp: new Date(),
        }
    })

    return commentEdited
}

async function deleteComment(commentId){
    await prisma.comment.delete({
        where: {
            id: commentId,
        }
    })
}

async function getUsers(userId, filters){
    const addFilters = [];
    const followingList = await getFollowedUser(userId);
    const pendingList = await getPendingUser(userId);
    const requestedList = await getRequestedUser(userId);

    console.log(pendingList)

    if(filters.following){
        addFilters.push({
            id: {
                in: followingList,
            }
        })
    }

    if(filters.search){
        addFilters.push({
            username: {
                contains: filters.search,
                mode: "insensitive",
            }
        })
    }

    if(filters.pending) {
        addFilters.push({
            id: {
                in: pendingList,
            }
        })
    }

    if(filters.requested) {
        addFilters.push({
            id: {
                in: requestedList,
            }
        })
    }

    const userList = await prisma.user.findMany({
        where: addFilters.length > 0 ? {AND: addFilters} : {NOT: { id: userId} },
        select: {
            id: true,
            image: true,
            username: true,
            follows: {
                where: {
                    userFollowedId: userId,
                },
                select :{
                    isAccepted: true,
                }
            },
            followers: {
                where: {
                    userId: userId,
                },
                select: {
                    isAccepted: true,
                }
            },
        },
    })

    return userList;
}

async function followUser(userId, userFollowedId){
    await prisma.follow.create({
        data: {
            userFollowedId: userFollowedId,
            userId: userId
        }
    })
}

async function acceptFollow(userId, userFollowedId) {
    const follow = await prisma.follow.update({
        where: {
            userId_userFollowedId: {
                userId: userId,
                userFollowedId: userFollowedId,
            }
        },
        data:{
            isAccepted: true,
        }
    })

    return follow
}

async function unfollow(userId, userFollowedId) {
    const follow = await prisma.follow.findFirst({
        where: {
            OR: [
                {
                    userId: userId,
                    userFollowedId: userFollowedId,
                },
                {
                    userId: userFollowedId,
                    userFollowedId: userId,
                }
            ]
        }
    });

    if(follow) {
        await prisma.follow.delete({
            where: {
                userId_userFollowedId: {
                    userId: follow.userId,
                    userFollowedId: follow.userFollowedId,
                },
            }
        })
    }

    return follow
}

async function updateProfile(userId, newUser){
    const updatedProfile = await prisma.user.update({
        where:{
            id: userId,
        },
        data:{
            email: newUser.email,
            username: newUser.username,
        }
    })

    return updatedProfile
}

async function updatePassword(userId, newPassword){
    const passwordHashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: {
            id: userId,
        },
        data:{
            password: passwordHashed,
        }
    })
}

module.exports = {createAccount, createPost, getAllPost, getPostLikedByUser, likePost, unlikePost,
    deletePost, getFollowedUser, createComment, editComment, deleteComment, getUsers, followUser,
    acceptFollow, unfollow, updateProfile, updatePassword
}