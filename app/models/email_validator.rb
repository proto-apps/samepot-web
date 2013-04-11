require 'mail'

class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    begin
      mail = Mail::Address.new(value)

      # check legal address
      res = mail.domain and mail.address == value

      # analyze
      tree = mail.__send__(:tree)
      res &&= (tree.domain.dot_atom_text.elements.size > 1)
    rescue Exception => e
      res = false
    end

    unless res
      record.errors[attribute] << (options[:message] || I18n.t('activerecord.errors.messages.invalid'))
    end
  end
end
