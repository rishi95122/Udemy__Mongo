import courseChapterSchema from "../schema/coursesChapterSchema.js";

export const addContent = async (req, res) => {
  const addcontent = await courseChapterSchema.updateOne(
    {
      course: req.body.course,
      username: req.body.username,
      "chapters.name": req.body.chapter,
    },
    { $push: { "chapters.$.content": { contentname: req.body.content }  } },{ upsert: true }
  );

  return res.status(201).send("Added")
 
};

export const getContent = async (req, res) => {
const getcontent=await courseChapterSchema.find({username:req.body.username,course:req.body.course,"chapters.name":req.body.chapter},{"chapters":1,"_id":0})
const content=[]

for(let i=0;i<getcontent[0].chapters.length;i++)
  {
   if(getcontent[0].chapters[i].name==req.body.chapter)
{
  content.push(getcontent[0].chapters[i].content)
}

    
  }


return res.status(200).json(content[0])
};
