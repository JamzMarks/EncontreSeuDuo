import {GameController} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import {Input} from './Input'
import * as Checkbox from '@radix-ui/react-checkbox'
import {Check} from 'phosphor-react'
import { useEffect, useState, FormEvent } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<String[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent){
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if(!data.name){
      return
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`,{
        name: data.name,
        yearPlaying: Number(data.yearPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      })
      alert("certo")
    } catch(err){
      console.log(err)
      alert('erro')
    }
    
  }

  

    return(
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
                <Dialog.Content className='fixed bg-[#2A2634] px-10 py-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                 
                  <Dialog.Title className='text-3xl text-white font-black'>
                    Publique um anúncio
                  </Dialog.Title>
                  
                    <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="game">Qual o game?</label>
                            <select 
                                id="game" name="game" 
                                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
                                defaultValue=""
                            >
                                <option disabled value="">Selecione o game que deseja jogar</option>
                               
                                {games.map(game => {
                                  return <option key={game.id} value={game.id}>{game.title}</option>
  
                                })}
                            </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                          <label htmlFor="name">Seu nome (ou nickname)</label>
                          <Input id="name" name="name" type="text" placeholder='Como te chamam dentro do game?' />
                        </div>

                        <div className='grid grid-cols-2 gap-6' >
                          <div className='flex flex-col gap-2'>
                            <label htmlFor="yearPlaying">Joga há quantos anos?</label>
                            <Input id="yearPlaying" name="yearPlaying" type="number" placeholder='Tudo bem ser ZERO' />
                          </div>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu discord?</label>
                            <Input id="discord" name="discord" type="text" placeholder='Usuario#0000' />
                          </div>
                        </div>

                        <div className='flex gap-6'>
                          <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quando costuma jogar?</label>


                              <ToggleGroup.Root 
                                type='multiple' 
                                className='grid grid-cols-4 gap-2'
                                onValueChange={setWeekDays}
                                // value={weekDays}
                              >

                                <ToggleGroup.Item
                                  value="0"
                                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-600' : ''}`}
                                  title='Domingo'>D</ToggleGroup.Item>

                                <ToggleGroup.Item
                                  value="1"
                                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-600' : ''}`}
                                  title='Segunda'>S</ToggleGroup.Item>

                                <ToggleGroup.Item
                                  value="2"
                                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-600' : ''}`}
                                  title='Terça'>T</ToggleGroup.Item>

                                <ToggleGroup.Item
                                  value="3"
                                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-600' : ''}`}
                                  title='Quarta'>Q</ToggleGroup.Item>

                                <ToggleGroup.Item
                                  value="4"
                                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-600' : ''}`}
                                  title='Quinta'>Q</ToggleGroup.Item>

                                <ToggleGroup.Item
                                  value="5"
                                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-600' : ''}`}
                                  title='Sexta'>S</ToggleGroup.Item>

                                <ToggleGroup.Item
                                  value="6"
                                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-600' : ''}`}
                                  title='Sábado'>S</ToggleGroup.Item>
                                
                              </ToggleGroup.Root>

                          </div>
                          <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                              <Input id="hourStart" name="hourStart" type="time" placeholder='De' />
                              <Input id="hourEnd" name="hourEnd" type="time" placeholder='Até' />
                            </div>
                          </div>
                        </div>

                        <label className='mt-2 flex items-center gap-2 text-sm '>
                          <Checkbox.Root
                          checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                              if (checked == true) {
                                setUseVoiceChannel(true)
                              } else {
                                setUseVoiceChannel(false)
                              }
                            }}
                            className='w-6 h-6 rounded bg-zinc-900 p-1'>
                            <Checkbox.Indicator className=''>
                                <Check className='w-4 h-4 text-emerald-400'></Check>
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          Costume me conectar ao chat de voz
                        </label>

                        <footer className='mt-4 flex justify-end gap-4'>
                          <Dialog.Close
                          type="button" 
                          className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                          <button 
                          className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' 
                          type='submit'>
                            <GameController size={24}/>
                            Encontrar duo
                          </button>
                        </footer>
                    </form>

                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}