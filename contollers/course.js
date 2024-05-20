
import teacherSchema from "../schema/teachersSchema.js";
import courseChapterSchema from "../schema/coursesChapterSchema.js";
export const add = async (req, res) => {
  const dup = await teacherSchema.find({
    $and: [
      {
        username: req.body.username,
        course: req.body.course,
      },
    ],
  });

  if (dup.length > 0)
    return res.status(401).send("Course with same name already added");

  const add = await teacherSchema.updateOne(
    { username: req.body.username },
    {
      $push: {
        courses: {
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
  const get = await teacherSchema.find({ username: req.user.username });

  if (get) return res.status(200).json(get[0].courses);
  else {
    res.status(401).json("error in get courses");
  }
};

export const addcourse = async (req, res) => {
  const dup = await courseChapterSchema.find({
    $and: [
      {
        username: req.body.username,
        course: req.body.course,
        "chapters.name": req.body.name,
      },
    ],
  });

  if (dup.length > 0)
    return res.status(401).send("Chapter with same name already added");

  const addChapter = await courseChapterSchema.updateOne(
    { username: req.body.username, course: req.body.course },
    { $push: { chapters: { name: req.body.name } } },
    { upsert: true }
  );
  if (addChapter) return res.status(201).send("Added");
  else return res.status(401).send("Not Added");


};

export const getcourses = async (req, res) => {
  const getChapters = await courseChapterSchema.find({
    $and: [{ username: req.body.username, course: req.body.course }],
  });
  if(getChapters.length>0)
  return res.status(200).json(getChapters[0].chapters);
};

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
