import React, { useState } from 'react'
import { getInputVal } from '@utils'
import { InputField, Textarea } from '@shared/FormFields'
import { Container, Row, Col, Button, Card, InputGroup } from 'react-bootstrap'

const Head = () => {
  const [text, setText] = useState()
  const [keywords, setKeywords] = useState()

  const handleSkill = e => {
    const { value, type, max } = e.target
    const val = getInputVal(value, type, max)
    if (val === false) return false
    else {
      setText(val)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && text) {
      setText()
      const filterkeywords = [...keywords, { skill: text }]
      setKeywords(filterkeywords)
    }
  }

  const handleRemove = e => {
    const filterkeywords = keywords.filter((skill, i) => i !== e)
    setKeywords(filterkeywords)
  }

  return (
    <section>
      <h2>Head</h2>
      <Card title='keywords'>
        <div className='FormGroup'>
          <Row>
            <Col lg={12}>
              <InputField
                value={text}
                placeholder='Press enter to add multiple skills. (Ex: SAP Ariba Procurement)'
                onChange={handleSkill}
                onKeyDown={handleKeyDown}
              />
            </Col>
          </Row>

          {/* {keywords &&
            keywords.map((item, i) => (
              <Row key={item.skill + i} className='mb-2'>
                <div className='SkillTag'>{item.skill}</div>
                <Col lg={3}>
                  <InputField
                    name='yearsOfExperience'
                    value={item.yearsOfExperience}
                    type='number'
                    index={i}
                    placeholder='Years of exp'
                    mb='None'
                    onChange={handleChange}
                    onFocus={() => handleFocus(i)}
                  />
                </Col>
                <Col lg>
                  <InputGroup className='form-group FormFieldGroup None'>
                    <FormControl
                      name='achievenment'
                      value={item.achievenment || ''}
                      index={i}
                      placeholder='Achievenment / Experience in this Skill'
                      onChange={handleChange}
                      onFocus={() => handleFocus(i)}
                    />
                    <InputGroup.Append>
                      <Button
                        variant='link'
                        className='DeleteBtn'
                        onClick={() => handleRemove(i)}
                      >
                        <img src={TrashIcon} />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Row>
            ))} */}
        </div>
      </Card>
    </section>
  )
}

export default Head
