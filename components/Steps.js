export default function Steps({ steps }) {
  return (
    <nav className="flex items-center justify-left" aria-label="Progress">
      <p className="text-sm font-medium text-primary">
        {steps.find((step) => step.status === 'current').name}
      </p>
      <ol role="list" className="ml-8 flex items-center space-x-5">
        {steps.map((step) => (
          <li key={step.name}>
            {step.status === 'complete' ? (
              <a href={step.href} className="block w-2.5 h-2.5 bg-primary rounded-full">
                <span className="sr-only">{step.name}</span>
              </a>
            ) : step.status === 'current' ? (
              <a href={step.href} className="relative flex items-center justify-center" aria-current="step">
                <span className="absolute w-5 h-5 p-px flex" aria-hidden="true">
                  <span className="w-full h-full rounded-full bg-stack-4" />
                </span>
                <span className="relative block w-2.5 h-2.5 bg-primary rounded-full" aria-hidden="true" />
                <span className="sr-only">{step.name}</span>
              </a>
            ) : (
              <a href={step.href} className="block w-2.5 h-2.5 bg-stack-4 rounded-full hover:bg-stack-3">
                <span className="sr-only">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
