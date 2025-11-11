import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Skills.module.css";

const tabs = ["Frontend", "Backend", "Tools", "Technology"];

const skillsData = [
  {
    id: 1,
    name: "React.js",
    description:
      "React.js is a powerful JavaScript library for building interactive and reusable UI components.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    masteredConcepts: ["Hooks", "Components", "Routing"],
    proficiency: "Advanced",
    experienceYears: 3,
    notes: "Used extensively in frontend projects.",
    certificates: [],
    projects: [],
    tags: ["Frontend", "Technology"],
  },
  {
    id: 2,
    name: "JavaScript",
    description:
      "A dynamic scripting language essential for modern web development.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    masteredConcepts: ["ES6+", "DOM", "Async Programming"],
    proficiency: "Advanced",
    experienceYears: 4,
    notes: "Foundation of all frontend work.",
    certificates: [],
    projects: [],
    tags: ["Frontend"],
  },
  {
    id: 3,
    name: "Node.js",
    description:
      "A backend runtime that allows JavaScript to run on the server side.",
    image: "https://nodejs.org/static/images/logo.svg",
    masteredConcepts: ["Express", "REST API", "Middleware"],
    proficiency: "Intermediate",
    experienceYears: 2,
    notes: "Used for API and server-side logic.",
    certificates: [],
    projects: [],
    tags: ["Backend"],
  },
  {
    id: 4,
    name: "MongoDB",
    description:
      "A NoSQL database designed for flexible and scalable data storage.",
    image: "https://www.mongodb.com/assets/images/global/leaf.svg",
    masteredConcepts: ["Schema Design", "Aggregation", "Indexes"],
    proficiency: "Intermediate",
    experienceYears: 1,
    notes: "Used with Node.js for MERN stack.",
    certificates: [],
    projects: [],
    tags: ["Backend", "Technology"],
  },
  {
    id: 5,
    name: "Git & GitHub",
    description:
      "Version control tools for tracking changes and collaborating on code.",
    image:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    masteredConcepts: ["Branching", "Merging", "Pull Requests"],
    proficiency: "Advanced",
    experienceYears: 3,
    notes: "Used for all version control needs.",
    certificates: [],
    projects: [],
    tags: ["Tools"],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filteredSkills = skillsData.filter((skill) =>
    skill.tags.includes(activeTab)
  );

  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.skilltitle}>
        <h2>Tools of My Trade</h2>
        <p>A craftsman is only as good as his tools — here are mine.</p>
      </div>
      <div className={styles.contentLayout}>
        {/* Left Panel: Tabs + Skill List */}
        <aside className={styles.leftPanel}>
          <nav className={styles.tabsWrapper}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tabButton} ${
                  activeTab === tab ? styles.active : ""
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedSkill(null);
                }}
              >
                {tab}
              </button>
            ))}
          </nav>
          <h3 className={styles.listTitle}>{activeTab} Skills</h3>
          <div className={styles.skillList}>
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  className={`${styles.skillListItem} ${
                    selectedSkill?.id === skill.id ? styles.selected : ""
                  }`}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill.name}
                </motion.div>
              ))
            ) : (
              <p className={styles.noSkills}>No skills found.</p>
            )}
          </div>
        </aside>

        {/* Right Panel: Skill Details */}
        <div className={styles.rightPanel}>
          <AnimatePresence mode="wait">
            {!selectedSkill ? (
              <motion.div
                key="placeholder"
                className={styles.placeholder}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img src="assets/boy-with-vr.png" alt="vrBoy" />
                <p>Select a skill to view its details</p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedSkill.id}
                className={styles.skillDetails}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.skillHeader}>
                  <img
                    src={selectedSkill.image}
                    alt={selectedSkill.name}
                    className={styles.skillImage}
                  />
                  <div>
                    <h2>{selectedSkill.name}</h2>
                    <p className={styles.proficiency}>
                      {selectedSkill.proficiency} •{" "}
                      {selectedSkill.experienceYears}{" "}
                      {selectedSkill.experienceYears === 1 ? "year" : "years"}{" "}
                      experience
                    </p>
                  </div>
                </div>
                <p className={styles.description}>
                  {selectedSkill.description}
                </p>
                {selectedSkill.masteredConcepts?.length > 0 && (
                  <div className={styles.subSection}>
                    <strong>Mastered Concepts:</strong>
                    <ul>
                      {selectedSkill.masteredConcepts.map((concept, i) => (
                        <li key={i}>{concept}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedSkill.notes && (
                  <p className={styles.notes}>
                    <strong>Notes:</strong> {selectedSkill.notes}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
