import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Select({ label, options, value, onChange, variant }) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className={`block text-primary text-${variant} ${variant === 'sm' ? 'font-light' : 'font-semibold'}`}>{label}</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-stack-4 border border-stack-4 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm">
              <span className="flex items-center">
                {value.avatar && <img src={value.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />}
                <span className="ml-3 block truncate font-semibold">{value.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-stack-3 border-2 border-stack-4 shadow-lg max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-default bg-stack-2' : 'text-primary',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ value, active }) => (
                      <>
                        <div className="flex items-center">
                          {option.avatar && <img src={option.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />}
                          <span
                            className={classNames(value ? 'font-semibold text-default' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {option.name}
                          </span>
                        </div>
                        {value ? (
                          <span
                            className={classNames(
                              active ? 'text-default' : 'text-primary',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
