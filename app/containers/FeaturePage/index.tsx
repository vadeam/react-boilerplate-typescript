/**
 * FeaturePage
 * List all the features
 */
import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { useIntl } from 'react-intl'

import H1 from 'components/H1'

import { ListStyled, ListItemStyled, ListItemTitleStyled } from './styled'
import messages from './messages'

const FeaturePage = () => {
  const { formatMessage } = useIntl()
  return (
    <div>
      <Helmet>
        <title>{formatMessage({ ...messages.title })}</title>
        <meta name="description" content="Feature page of React Boilerplate TypeScript application" />
      </Helmet>
      <H1>{formatMessage({ ...messages.header })}</H1>
      <ListStyled>
        <ListItemStyled>
          <ListItemTitleStyled>{formatMessage({ ...messages.scaffoldingHeader })}</ListItemTitleStyled>
          <p> {formatMessage({ ...messages.scaffoldingMessage })}</p>
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTitleStyled>{formatMessage({ ...messages.feedbackHeader })}</ListItemTitleStyled>
          <p>{formatMessage({ ...messages.feedbackMessage })}</p>
        </ListItemStyled>
        <ListItemStyled>
          <ListItemTitleStyled>{formatMessage({ ...messages.feedbackHeader })}</ListItemTitleStyled>
          <p>{formatMessage({ ...messages.feedbackMessage })}</p>
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTitleStyled>{formatMessage({ ...messages.routingHeader })}</ListItemTitleStyled>
          <p>{formatMessage({ ...messages.routingMessage })}</p>
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTitleStyled>{formatMessage({ ...messages.networkHeader })}</ListItemTitleStyled>
          <p>{formatMessage({ ...messages.networkMessage })}</p>
        </ListItemStyled>

        <ListItemStyled>
          <ListItemTitleStyled>{formatMessage({ ...messages.intlHeader })}</ListItemTitleStyled>
          <p>{formatMessage({ ...messages.intlMessage })}</p>
        </ListItemStyled>
      </ListStyled>
    </div>
  )
}

export default FeaturePage
