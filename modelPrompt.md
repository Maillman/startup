The goal: I want the model to generate a quote from a random movie / tv show in pop fiction. I also want the title as well as related/keywords alongside the quote.
It should be formatted as such in JSON:
{
    "Title":
    "Keywords":
    "Quote":
    "Context":
}

When used in the Cipher Application, it should end up like this:
<div style="border: thin solid; padding: 10px">
    <h1>Challenge #1: "Title"</h1>
    <p>"Quote"</p>
    <p>Hint #1: "Keywords"[Random]</p>
    <p>Hint #2: "Context"</p>
    <p>Hint #3: Type of Cipher Used</p>
</div>

Prompt:
Generate a quote from a random movie / tv show in pop fiction. The title should be included. Also include any related keywords associated with the quote (such as who said it). Finally give the context behind the quote. It should be formatted as such in JSON:
{
    "Title": "TITLEHERE"
    "Keywords": "[\"WORD1\",\"WORD2\"...]"
    "Quote": "QUOTEHERE"
    "Context": "CONTEXTHERE"
}
