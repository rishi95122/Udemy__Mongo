
import teacherSchema from "../schema/teachersSchema.js";
import courseChapterSchema from "../schema/coursesChapterSchema.js";
export const add = async (req, res) => {
 const {username}=req.username
  const dup = await teacherSchema.find({
    $and: [
      {
        username: username,
        "courses.course": req.body.name,
      },
    ],
  });
console.log(dup)
  if (dup.length > 0)
    return res.status(401).send("Course with same name already added");

  const add = await teacherSchema.updateOne(
    { username: username },
    {
      $push: {
        courses: {
           username: username ,
          course: req.body.name,
          description: req.body.description,
          image: req.body.image,
          category: req.body.category,
        },
      },
    },
    { upsert: true }
  );

  if (add) {

    return res.status(201).json("done");
  } else {
   
    return res.status(400).json("Failed");
  }
};

export const get = async (req, res) => {
  const {username}=req.username
  const get = await teacherSchema.find({ username: username});

  if (get[0]) return res.status(200).json(get[0]?.courses);
  else {
   return res.status(401).json({msg:"No Courses Found"});
  }
};

export const addcourse = async (req, res) => {
  const {username}=req.username
 
  const dup = await courseChapterSchema.find({
    $and: [
      {
        username: username,
        course: req.body.course,
        "chapters.name": req.body.name,
      },
    ],
  });

  if (dup.length > 0)
    return res.status(401).send("Chapter with same name already added");
  console.log("DASD",username,req.body)
  const addChapter = await courseChapterSchema.updateOne(
    { username: username, course: req.body.course },
    { $push: { chapters: { name: req.body.name } } },
    { upsert: true }
  );
  if (addChapter) return res.status(201).send("Added");
  else return res.status(401).send("Not Added");


};

export const getcourses = async (req, res) => {
  const username=req.body.username
  console.log(req.body)
  const getChapters = await courseChapterSchema.find({
    $and: [{ username: username, course: req.body.course }],
  });
  console.log(username)
  if(getChapters?.length>0)
  return res.status(200).json(getChapters[0].chapters);
};

export const getcourseData = async (req, res) => {
  // const getChapters = await courseChapterSchema.find({
  //   $and: [{ username: req.body.username, course: req.body.course }],
  // });
   const {username}=req.body
  const getChapters = await teacherSchema.find({
    
    $and: [{ username: username, 'courses.course': req.body.course }]
  }).select("courses");

  const result= getChapters[0]?.courses.filter((item)=>item.course==req.body.course)
 
  if(result)
  return res.status(200).json(result[0]);
};

export const deleteCourseContent=async(req,res)=>{
  const {username}=req.username
  const id =req.params.id
  const remove = await courseChapterSchema.findOneAndUpdate(
    { username:username, course: req.body.course },
    { $pull: { chapters: { _id: id } } },
    {returnDocument:'after'}
  );

 if(remove) return res.status(200).json(remove.chapters)
  else return res.status(400).json("error")
}

export const getcoursesBycategory = async (req, res) => {
  const data = [];
  const getall = await teacherSchema.find({});
  for (let i = 0; i < getall.length; i++) {
    getall[i].courses.map((obj) => {
      data.push(obj);
    });
  }
  const category = data.filter((item) => {
    return item.category == req.body.category;
  });
  return res.status(200).send(category);
};

export const getallcourses = async (req, res) => {
  const data = [];
  const getall = await teacherSchema.find({});
  for (let i = 0; i < getall.length; i++) {
    getall[i].courses.map((obj) => {
    
      data.push(obj);
    });
  }

  if (data) return res.status(200).json(data);
  else return res.status(400).json("no daTA FOUND");
};
export const deleteCourse = async (req, res) => {
 const id = req.params.id
 const {username}=req.username
 const del = await teacherSchema.findOneAndUpdate(
  { username: username },
  {
    $pull: {
      courses: {
        _id: id,
      },
    },
  },
 { returnDocument: 'after'}
);
console.log(del)
 if(del) return res.status(200).json(del.courses)
  else return res.status(400).json("error")
}; 
