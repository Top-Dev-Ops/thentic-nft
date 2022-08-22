export default function ApiKeyInput({
  apiKey,
  setApiKey,
}) {
  return (
    <div>
      <label htmlFor="apiKeyInput" className="block text-sm font-light text-primary">
        API key (skip for new key *):
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="apiKeyInput"
          id="apiKeyInput"
          className="block w-full sm:text-sm rounded-md bg-stack-4 border-stack-3 focus-visible:border-primary focus-visible:ring-0 text-primary"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
        />
      </div>
    </div>
  )
}