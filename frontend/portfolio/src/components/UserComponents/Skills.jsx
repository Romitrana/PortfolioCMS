import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./skills.module.css";

const tabs = ["Frontend", "Backend", "Language", "Tools"];

export default function Skills({ data = {} }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillsData = data.skills || [];

  // Filter by FIRST tag (category) - schema is array!
  const filteredSkills = skillsData.filter((skill) => {
    const tags = skill.tags || [];
    return tags.length > 0 && tags[0] === activeTab;
  });

  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.skilltitle}>
        <h2>Tools of My Trade</h2>
        <p>A craftsman is only as good as his tools — here are mine.</p>
      </div>
      <div className={styles.contentLayout}>
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
                  key={skill._id}
                  className={`${styles.skillListItem} ${
                    selectedSkill?._id === skill._id ? styles.selected : ""
                  }`}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill.name}
                </motion.div>
              ))
            ) : (
              <p className={styles.noSkills}>
                No {activeTab.toLowerCase()} skills found.
              </p>
            )}
          </div>
        </aside>

        <div className={styles.rightPanel}>
          <AnimatePresence mode="wait">
            {!selectedSkill ? (
              <motion.div key="placeholder" className={styles.placeholder}>
                <img src="assets/boy-with-vr.png" alt="vrBoy" />
                <p>Select a skill to view its details</p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedSkill._id}
                className={styles.skillDetails}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.skillHeader}>
                  <img
                    src={selectedSkill.image || "/default-skill.png"}
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

                {/* Tags from schema array */}
                {selectedSkill.tags?.length > 0 && (
                  <div className={styles.subSection}>
                    <div className={styles.tagsContainer}>
                      {selectedSkill.tags.map((tag, i) => (
                        <span key={i} className={styles.tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

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
