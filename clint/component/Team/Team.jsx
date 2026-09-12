import "./Team.css";

const teamMembers = [
  {
    img: "/Me.jpg",
    name: "Anshul Chaurasiya",
    role: "software engineer 🧑‍💻",
  },
  {
    img: "/dev.png",
    name: "Dev Rathore",
    role: "",
  },
  {
    img: "/bhoomi.jpg",
    name: "Bhoomi Deolikar",
    role: "",
  },
  {
    img: "/default.jpg",
    name: "Shreya Singh Chandel",
    role: "",
  },
  {
    img: "/default.jpg",
    name: "Ashish Balmiki",
    role: "",
  },
  {
    img: "/team.jpg",
    name: "Gang 😎🥂",
    role: "",
    wide: true, // special width
  },
];

function Team() {
  return (
    <div className="team_root">
      <h1 className="team_title">Our Team</h1>

      <div className="Team_box">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="member_img"
            style={member.wide ? { width: "60vw" } : {}}
          >
            <img src={member.img} alt={member.name} />

            <div className="name_div">
              <h1 className="name">{member.name}</h1>

              {member.role && <p>{member.role}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
