import express, {Express} from "express"
import {getPersons, getPerson, getPersonsInClass, postPerson, deleteUser, updateUser} from "./src/controllers/personController";
import {getClasses, getClass, deleteClass, updateClass, postClass} from "./src/controllers/classController";
import {getLectures, getLecture, postLecture, deleteLecture, updateLecture} from "./src/controllers/lectureController";
import { PrismaClient, Prisma } from '@prisma/client'


const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 8000;


app.get("/persons", async (req, res) => {
    const persons = await getPersons()
    if (!persons.length) {
        return res.json({
            message: "There are no persons in the database."
        })
    }
    return res.status(200).json({
        message: "OK",
        data: persons
        }
    )
});

app.get("/persons/:id", async (req, res) => {
    const { id } = req.params
    const person = await getPerson(id)
    if (person === null) {
        return res.json({
            message: `User ${id} does not exist.`
        })
    }
    return res.status(200).json({
        message: "OK",
        data: person
    });
});

app.post("/persons", async (req, res) => {
    try {
        const newUser = await postPerson(req.body)
        return res.status(201).json({
            message: "Person created.",
            data: newUser
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.json({
                    message: "Person already exists."
                })
            }
        }
    }
});

app.patch("/persons/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedUser = await updateUser(req.body, id)
        return res.status(200).json({
            message: "Person updated",
            data: updatedUser
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code === 'P2003') {
                return res.json({
                    message: `${req.body.classCode} does not exist.`
                })
            } else if(e.code === 'P2025') {
                return res.json({
                    message: "Can't find the user you are trying to update."
                })
            }
        }
    }
});


app.get("/classes", async (req, res) => {
    const classes = await getClasses()
    if(!classes.length) {
        return res.json({
            message: "There are no classes in the database"
        })
    }
    return res.status(200).json({
            message: "OK",
            data: await getClasses()
        }
    )
});

app.get("/classes/:id", async (req, res) => {
    const { id } = req.params
    const xclass = await getClass(id)
    if (xclass === null) {
        return res.json({
            message: `Class ${id} does not exist.`
        })

    }
    return res.status(200).json({
        message: "OK",
        data: xclass
    });
})

app.patch("/classes/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedClass = await updateClass(req.body, id)
        return res.status(200).json({
            message: "Person updated",
            data: updatedClass
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res.json({
                    message: "Can't find the class you are trying to update."
                })
            }

        }
    }
})

app.post("/class", async (req, res) => {
    try {
        const newClass = await postClass(req.body)
        return res.status(201).json({
        message: "New class created.",
        data: newClass
        })
    } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.json({
                    message: "Class already exists."
                })
            }
        }
    }
});


app.get("/lectures", async (req, res) => {
    const lectures = await getLectures()
    if (!lectures.length) {
        return res.json({
            message: "There are no lectures in the database"
        })
    }
    return res.status(200).json({
        message: "OK",
        data: await getLectures()
    })
});


app.get("/lectures/:id", async (req, res) => {
    const { id } = req.params
    const lecture = await getLecture(id)
    if (lecture === null) {
        return res.json({
            message: `Lecture ${id} does not exist.`
        })
    }
    return res.status(200).json({
        message: "OK",
        data: lecture
    });
});

app.post("/lectures", async(req, res) => {
    try {
        const lecture = await postLecture(req.body)
        return res.status(201).json({
            message: `New lecture created with name ${req.body.name}.`,
            data: lecture
        })
    } catch(e) {
        console.log(e)
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.json({
                    message: `Lecture with name ${req.body.name} already exists.`
                })
            } else if (e.code === 'P2003') {
                return res.json({
                    message: "The user(s) you are trying to add does not exist."
                })
            }
        }
    }
});

app.patch("/lectures/:id", async (req, res) => {
    const { id } = req.params
    try {
        const updatedLecture = await updateLecture(req.body, id)
        return res.json({
            message: "Lecture updated.",
            data: updatedLecture
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res.json({
                    message: "Can't find lecture you are trying to update."
                })
            } else if (e.code === 'P2002') {
                return res.json({
                    message: "Person already in lecture."
                })
        }

        }
    }
})

app.get("/inclass/:code", async (req, res) => {
    try {
    const { code } = req.params
    const classmates = await getPersonsInClass(code)
    if (!classmates.length) {
        return res.json({
            message: "There are no persons in this class, or the class does not exist."
        })
    }
    return res.status(200).json({
        message: "OK",
        data: classmates
    });
    } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e) {
                return res.json({
                    message: "Error"
                })
            }
        }
    }
})


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
