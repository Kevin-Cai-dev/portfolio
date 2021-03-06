import { useStaticQuery, graphql } from "gatsby";
import React from "react";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ProjectLinks from "../projects/project-links";
// image, title, description, technologies, link/s as icons

const ProjectBox = styled.div`
  height: 20rem;
  width: var(--project-width);
  max-width: var(--max-content-width);
  background-color: var(--box-color);
  margin: 1rem;
  box-shadow: 5px 5px var(--box-shadow);
  display: flex;
  justify-content: center;
  overflow: auto;

  @media only screen and (max-width: 620px) {
    height: 17rem;
  }
`;

const ProjectImage = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: calc(var(--project-width) / 2);
  max-width: calc(var(--max-content-width) / 2);
  filter: blur(1px);

  @media only screen and (max-width: 620px) {
    display: none;
  }
`;

const ProjectInfo = styled.div`
  width: calc(var(--project-width) / 2);
  max-width: calc(var(--max-content-width) / 2);
  padding: 1em;
  box-sizing: border-box;
  position: relative;

  .project-description {
    font-family: var(--text-font);
    margin-bottom: 1.5em;
  }

  .project-tech {
    display: flex;
    flex-wrap: wrap;
    font-family: var(--subtitle-font);
    list-style-type: none;
    padding: 0;
  }
  .project-tech li {
    white-space: nowrap;
    margin: 0 1em 0.2em 0;
  }

  @media only screen and (max-width: 620px) {
    width: var(--project-width);
  }
`;

const ProjectLink = styled.div`
  margin: 0.2em;
`;

const ProjectLinkWrapper = styled.div`
  display: flex;
`;

const ProjectTitleWrapper = styled.div`
  overflow: auto;
  display: flex;
  justify-content: space-between;
  margin: 0;
  align-items: center;
  font-family: var(--title-font);
  font-size: 1.5em;
  letter-spacing: 0.1rem;
`;

const ProjectTitle = styled.h3`
  margin: 0;
  padding: 0;

  .project-title {
    text-decoration: none;
    color: var(--title-color);
  }
`;

const PlaceholderText = styled.h3`
  font-family: var(--text-font);
`;

const ProjectList = () => {
  const data = useStaticQuery(graphql`
    {
      query: allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "project" } } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
              cover {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
            html
          }
        }
      }
    }
  `);

  const projects = data.query.edges.filter(({ node }) => node);
  const projectNum = projects.length;

  return (
    <React.Fragment>
      {projects &&
        projects.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { external, title, tech, github, cover } = frontmatter;
          const image = getImage(cover);
          return (
            <ProjectBox key={i}>
              <ProjectImage>
                <GatsbyImage image={image} alt={title} className="img" />
              </ProjectImage>
              <ProjectInfo>
                <ProjectTitleWrapper>
                  <ProjectTitle>
                    <a
                      href={external !== "none" ? external : github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-title"
                    >
                      {title}
                    </a>
                  </ProjectTitle>
                  <ProjectLinkWrapper>
                    <ProjectLink>
                      {external !== "none" && (
                        <ProjectLinks link={external} src={false} />
                      )}
                    </ProjectLink>
                    <ProjectLink>
                      {github && <ProjectLinks link={github} src={true} />}
                    </ProjectLink>
                  </ProjectLinkWrapper>
                </ProjectTitleWrapper>

                <div
                  className="project-description"
                  dangerouslySetInnerHTML={{ __html: html }}
                />

                {tech.length && (
                  <ul className="project-tech">
                    {tech.map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                )}
              </ProjectInfo>
            </ProjectBox>
          );
        })}
      {projectNum < 3 && <PlaceholderText>More coming soon!</PlaceholderText>}
    </React.Fragment>
  );
};

export default ProjectList;
