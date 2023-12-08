import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Ai text summerizer",
    url: "https://github.com/saarimshaikh/Ai_summerizer.git",
    image: "projects/wawatmos.jpg",
    description: "App that leverages AI to automatically generate concise & informative summaries from lengthy text content, or blogs",
  },
  {
    title: "Vertical Game",
    url: "https://github.com/saarimshaikh/Vertical_game.git",
    image: "projects/baking.jpg",
    description: "Interactive vertical platform game using JavaScript",
  },
  {
    title: "Expense Tracker",
    url: "https://github.com/saarimshaikh/Expense_tracker.git",
    image: "projects/avatar.jpg",
    description: "Created a web app fully mobile responsive which helps the user to keep track of their expenses with the power of JavaScript and VueJs.",
  },
  {
    title: "Travel UI/UX",
    url: "https://github.com/saarimshaikh/Travel_UI-UX_app.git",
    image: "projects/kanagame.jpg",
    description: "Created a lading page for travel explorers with most in demand framework ReactJs and React Hooks for state management.",
  },
  {
    title: "Anime Vault",
    url: "https://github.com/saarimshaikh/Anime_Vault.git",
    image: "projects/loader.jpg",
    description: "Built Modern Next 14 Server Side App with Server Actions, Infinite Scroll & Framer Motion Animations",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
