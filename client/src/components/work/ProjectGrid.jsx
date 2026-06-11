import { byType } from '../../data/projects.js'
import { color, type as typeToken, space } from '../../tokens.js'
import ProjectCard from './ProjectCard.jsx'

export default function ProjectGrid({ activeType, onOpen }) {
  const items = byType(activeType)

  if (items.length === 0) {
    return (
      <p
        style={{
          color: color.muted,
          fontSize: typeToken.body.size,
          fontFamily: 'Pretendard, sans-serif',
          padding: `${space[12]} 0`,
          textAlign: 'center',
        }}
      >
        해당 타입의 프로젝트가 없습니다.
      </p>
    )
  }

  const isVisual = activeType === 'visual'

  return (
    <>
      <style>{`
        .project-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: ${space[6]};
        }
        @media (min-width: 768px) {
          .project-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1280px) {
          .project-grid-visual {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
      <div className={`project-grid${isVisual ? ' project-grid-visual' : ''}`}>
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpen} />
        ))}
      </div>
    </>
  )
}
