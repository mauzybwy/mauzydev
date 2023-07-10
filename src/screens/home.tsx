/*****************************************************************************
 * Import
 *****************************************************************************/
import { Fragment, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useSmudgeBox } from "hooks/draw";
import { useWindowDimensions } from "hooks/window";
import { useMobileCheck } from "hooks/mobile";
import { PageContainer } from "components/containers";
import SmartGrid from "components/smart-grid";
import colors from "style/colors";

import DrivesafeImg from "assets/drivesafe.png";
import AlluderImg from "assets/alluder.png";
import PitchImg from "assets/pitch.png";
import MurmurImg from "assets/murmur.png";
import ProductoImg from "assets/producto.png";
import ScoutImg from "assets/pitch.png";

const TRANSLATE_START = 170;
const TRANSLATE_AMT = 2000;

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function Home () {
  const isMobile = useMobileCheck();
  const [state, setState] = useState<"init"|"about"|"portfolio"|"connect">("init");
  const [translate, setTranslate] = useState(TRANSLATE_START);
  const [stateChanged, setStateChanged] = useState(false);

  const canvasRef = useRef(null);

  const { width, height } = useWindowDimensions();

  const _boxWidth = {
    init: 250,
    about: 610,
    portfolio: 1200,
    connect: 610,
  }[state];
  const boxWidth = (isMobile && state !== "init") || _boxWidth > width - 64 ? width - 64 : _boxWidth;

  const _boxHeight = {
    init: 170,
    about: 340,
    portfolio: 600,
    connect: 100,
  }[state];
  const boxHeight = (isMobile && state !== "init" ) || _boxHeight > height - 64 ? height - 200 : _boxHeight;

  useSmudgeBox(canvasRef, boxWidth - 4, boxHeight - 4);

  useEffect(() => {
    if (!stateChanged && state !== "init") {
      setStateChanged(true);
    }
  }, [state])

  const [body, setBody] = useState(<Box />);
  const _body = {
    init: <Init />,
    about: <About />,
    portfolio: <Portfolio />,
    connect: <Connect />,
  }[state];

  useEffect(() => {
    console.log("RNDER");
    setTranslate(0);
  }, [])

  useEffect(() => {
    if (translate !== TRANSLATE_START) {
      setTranslate(TRANSLATE_AMT);
    }
    setTimeout(() => {
      setBody(_body)
    }, 250);
  }, [state])

  useEffect(() => {
    if (translate) {
      setTimeout(() => {
        setTranslate(0);
      }, 250)
    }
  }, [translate])

  const updateState = (tab) => {
    setState(tab)
    // !blw: other stuff here
  }
  
  return false ? (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, opacity: 1,   imageRendering: "pixelated",
 }}
      id="canvas"
    />
  ) : (
    <Fragment>
      <PageContainer
        //style={{ border: `10px solid ${colors.light}`, boxSizing: "border-box" }}
      >
        <Box display="flex" justifyContent="center">
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" style={{ gap: "16px" }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" className="interact disable-select" onClick={() => updateState("init")}>
                  brandon wetzel
                </Typography>
              </Box>
              <Box display="flex" style={{ gap: "16px" }}>
                {["about", "portfolio", "connect"].map(tab => (
                  <Typography
                    key={tab}
                    className="interact disable-select"
                    onClick={() => updateState(tab)}
                    style={{ textDecoration: state === tab ? "underline" : undefined }}
                  >
                    {tab}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box
              id="container"
              width={boxWidth}
              height={boxHeight}
              style={{
                border: `2px solid ${colors.accent}`,
                backgroundColor: stateChanged ? colors.dark_C : colors.dark,
                backgroundClip: "content-box",
                transition: "height 0.3s, width 0.6s",
                //transition: "all 1s",
                //transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1),",
                //transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.1)",
                //transition: "all 0.5 ease-in",
                overflow: "hidden",
              }}
            >
              <Container innerRef={null} style={{ transform: `translateY(${translate}px)`, transition: "transform 1s" }}>
                {body}
              </Container>
              {/* {blah.map(item => (
                  <Element name={item.id} style={{ width: "100%", height: "100%" }}>
                  <Container innerRef={item.ref}>
                  {item.body}
                  </Container>
                  </Element>
                  ))} */}
            </Box>
          </Box>
        </Box>
      </PageContainer>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: -1, opacity: 1, imageRendering: "pixelated" }}
        id="canvas"
      />
    </Fragment>
);
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Init = () => {
  return (
    <Typography>
      hello there :)
    </Typography>
  );
}

const About = () => {
  const tabs = [
    {
      id: "hi",
      body: "i'm BRANDON. i've worked through all bands of the computing spectrum, and am currently focused on WEB and MOBILE applications.",
    },
    {
      id: "tech",
      body: "iOS - android - React - embedded - Linux"
    },
    {
      id: "edu",
      body: "BS Computer Engineering - University of Maryland, 2015",
    },
    {
      id: "exp",
      body: (
        <>
          texas instruments,{" "}
          <a target="_blank" href="https://www.murmur.watch/">murmur</a>,{" "}
        <a target="_blank" href="https://www.alluder.com/">alluder</a>
        </>
      ),
    }
  ]
  
  return (
    <Box display="flex" style={{ alignSelf: "start" }}>
      <Box display="flex" flexDirection="column" style={{ gap: "16px" }}>
        {tabs.map(tab => (
          <Typography style={{ alignSelf: "start", fontWeight: 400 }}>
            <span style={{ fontWeight: 800 }}>~ {tab.id} ~</span>
            <br />
            {tab.body}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

const Portfolio = () => {
  const isMobile = useMobileCheck();
  
  const projects = [
    {
      title: "murmur",
      body: "asynchronous social tv.",
      imgSrc: MurmurImg,
      url: "https://www.murmur.watch",
    },
    {
      title: "alluder",
      body: "making film interactive.",
      imgSrc: AlluderImg,
      url: "https://www.alluder.com",
    },
    {
      title: "producto",
      body: "help yourself.",
      imgSrc: ProductoImg,
      url: "https://www.producto.cc",
    },
    {
      title: "pitch",
      body: "camping, on-demand.",
      imgSrc: PitchImg,
      url: "https://play.google.com/store/apps/details?id=com.mcc.pitch.beta",
    },
    /* {
     *   title: "scout",
     *   body: "",
     *   imgSrc: ScoutImg,
     * }, */
    {
      title: "drivesafe",
      body: "coming soon.",
      imgSrc: DrivesafeImg,
    },
  ]

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  
  return isMobile ? (
    <Box display="flex" flexDirection="column" width="100%" height="100%" style={{ gap: "8px" }}>
      {projects.map(project => (
        <PortfolioItem key={project.title} project={project} style={{ height: "400px" }} />
      ))}
    </Box>
  ) : (
    <Box display="flex" width="100%" height="100%">
      <Box display="flex" flexDirection="column" width="240px">
        {projects.map(project => (
          <Typography
            onClick={() => setSelectedProject(project)}
            className="interact"
            key={project.title}
            variant="h5"
            sx={{
              opacity: "1 !important",
              transition: "font-size 0.5s",
              fontWeight: selectedProject?.title === project?.title ? 700 : undefined,
              fontSize: selectedProject?.title === project?.title ? "2rem" : "1.4rem",
              "&:hover": {
                fontSize: "2rem",
              }
            }}
          >
            {project.title}
          </Typography>
        ))}
      </Box>
      {selectedProject && (
        <PortfolioItem project={selectedProject} />
      )}
    </Box>
  );
}

const PortfolioItem = ({ project, style }: { project, style? }) => {
  return (
    <Box
      display="flex"
      position="relative"
      justifyContent="flex-end"
      width="100%"
      onClick={() => project.url && window.open(project.url, "_blank")}
      sx={{
                  overflow: "hidden",
        "&:hover .hoverbaby": {
          transform: "scale(1.1,1.1)",
        },
        ...style,
      }}>
      <Box
        width="100%"
        height="100%"
        className="hoverbaby"
        sx={{
          //opacity: 0.4,
          backgroundImage: `url(${project?.imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.3s"
        }}
      />
      <Box
        position="absolute"
        top={0} left={0}
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          cursor: "pointer",
          background: "#000A",
          transition: "background 0.3s",
          "&:hover": {
            background: "#0004",
          }
        }}
      >
        <Typography variant="h4">
          {project.title}
        </Typography>
        <Typography>
          {project.body}
        </Typography>
      </Box>
    </Box>
  );
}

const Connect = () => {
  const isMobile = useMobileCheck();
  
  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      style={{ gap: "16px" }}
    >
      <a href="mailto:blwetze@gmail.com" target="_blank">
        <Typography>
          blwetze@gmail.com
        </Typography>
      </a>
      <a href="https://github.com/mauzybwy" target="_blank">
        <Typography>
          github
        </Typography>
      </a>
      <a href="https://www.linkedin.com/in/brandon-wetzel-ab793981/" target="_blank">
        <Typography>
          linkedin
        </Typography>
      </a>
    </Box>
  );
}

const Container = ({ children, innerRef, style } : { children, innerRef?, style? }) => {
  return (
    <Box
      ref={innerRef}
      p="16px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      className="hide-scrollbar"
      style={{
        overflow: "scroll",
        transition: "all 0.25s",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </Box>
  );
}
