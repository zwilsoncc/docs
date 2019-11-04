import Logo from '~/components/icons/logo-light'
import Button from './button'

export default function DeployButton({ url }) {
  return (
    <div className="deploy-button">
      <a href={url}>
        <Button type="success" icon={<Logo height={16} width={16} />}>
          Deploy
        </Button>
      </a>
      <style jsx>{`
        .deploy-button a {
          text-decoration: none;
        }

        .deploy-button :global(.button) {
          padding: 0;
          width: 100%;
        }

        .deploy-button :global(.button .text) {
          flex: 1 0 auto;
        }

        .deploy-button :global(.button .icon) {
          position: relative;
          left: auto;
          top: 0;
          bottom: 0;
          border-right: 1px solid var(--geist-success-dark);
          padding: 0 10px;
          height: 100%;
          display: flex;
          align-item: center;
          height: 38px;
        }
      `}</style>
    </div>
  )
}
